import { ethers, providers } from 'ethers';
import { ErrorMessageData, Providers } from '../../interface/web3-data-interface';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { SiweMessage } from 'siwe';
import { fetchAuth3Nonce } from './web3API';

const metamask = window.ethereum;

export class Web3Service {
    async setProvider(
        connector: string,
        verifactionType: string,
        actionType: string,
        infuraId: string,
        ) {
        let provider: ethers.providers.Web3Provider;
        let ens: string;
        let chainId: number;
        let infuraProvider;

        /*
            create provider
        */
        if ((connector === Providers.METAMASK) && (typeof window.ethereum !== 'undefined')) { 
            await metamask.request({
                method: 'eth_requestAccounts',
            });
            provider = new ethers.providers.Web3Provider(metamask);
        } else if((connector === Providers.WALLETCONNECT)) {
            infuraProvider = new WalletConnectProvider({
                infuraId: infuraId,
                qrcodeModalOptions: {
                    mobileLinks: [
                      "rainbow",
                      "metamask",
                      "argent",
                      "trust",
                      "imtoken",
                      "pillar",
                    ],
                },
            });

            // TODO: Remember connected users with walletconnect
            if (infuraProvider.wc.connected) {
                infuraProvider.disconnect();
            }
            await infuraProvider.enable();
            provider = new providers.Web3Provider(infuraProvider);
        } else {
            const error: ErrorMessageData = {
                actionType: actionType,
                verificationType: verifactionType,
                message: 'Error loading web3 provider'
            }
            throw error;
        }

        /**
            Try to resolve address ENS and updates the title accordingly.
        */
        const [address] = await provider.listAccounts();
        if (!address) {
            const error: ErrorMessageData = {
                actionType: actionType,
                verificationType: verifactionType,
                message: 'Address not found'
            }
            throw error;
        }

        try {
            const checkENS = await provider.lookupAddress(address)
            if (checkENS) {
                ens = checkENS;
            } else {
                ens = '';
            }
        } catch (error) {
            ens = '';
        }

        /*
            Get network from provider
        */
        const result = await provider.getNetwork();
        if(!result) {
            const error: ErrorMessageData = {
                actionType: actionType,
                verificationType: verifactionType,
                message: 'ChainId not found'
            }
            throw error;
        }
        chainId = result.chainId;

        return {
            address,
            ens,
            chainId,
            provider
        };
    }

    async createSiweMessage(
        address: string,
        statement: string,
        chainId: string,
        origin: string,
        doamin: string,
        provider: ethers.providers.Web3Provider,
        ) {
        let siweMessage;
        let nonceResult = await fetchAuth3Nonce();
        console.log('nonce result:',nonceResult);
        const messageExpirationTime = new Date((Date.now() + (600000))).toISOString(); // signature expires in 10 mins
    
        if (nonceResult.nonce !== '') {
            siweMessage = new SiweMessage({
                domain: doamin,
                address,
                statement,
                uri: origin,
                version: '1',
                chainId: chainId,
                nonce: nonceResult.nonce,
                expirationTime: messageExpirationTime
            });
        } else {
            siweMessage = new SiweMessage({
                domain: doamin,
                address,
                statement,
                uri: origin,
                version: '1',
                chainId: chainId,
                expirationTime: messageExpirationTime
            });
        }

        try {
            const messageToSign = siweMessage.prepareMessage();
            const signature = await provider.getSigner().signMessage(messageToSign);
            return {
                signature: signature,
                message: messageToSign,
                nonceSetFromBackend: nonceResult.nonce !==''? true : false
            };
        } catch (err) {
            throw err;
        }
    }
}