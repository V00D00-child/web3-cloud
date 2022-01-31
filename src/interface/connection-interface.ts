import { ActionData, ErrorMessageData } from "./web3-data-interface";

export interface ConnectionProps {
    primary: any;
    backgroundcolor: string; 
    size: string; 
    verifyinglabel: string;
    passweb3data: (web3Data: ActionData) => void;
    errorcallback: (errorData: ErrorMessageData) => void;
    dappname: string;
    logourl: string;
    infuraId: string;
    homePageurl: string;
    disableErrorDisplay: boolean;
    messageToSign: string;
}