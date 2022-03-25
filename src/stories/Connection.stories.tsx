import React from 'react';
import { ErrorMessageData, ActionData } from '../interface/web3-data-interface';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConnectionProps } from '../interface/connection-interface';
import { Connection } from '../components/Connection/Connection';

export default {
  title: 'Components/Connection',
  component: Connection,
} as ComponentMeta<typeof Connection>;

let web3data: ActionData;
let errorObject: ErrorMessageData;
let API_URL: string = 'http://localhost:80';
const apiKey = '';

const createUser = async (web3Values: ActionData) => {
  const requestOptionsCreate = {
   method: 'POST',
   headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}`},
   body: JSON.stringify(
     { 
       account: web3Values.address,
       email: web3Values.email,
       firstName: web3Values.firstName,
       lastName: web3Values.lastName,
       ens: web3Values.ens,
       chainId: web3Values.chainId,
     }
   )
 };
   
 await fetch(`${API_URL}/api/v1/users`, requestOptionsCreate)
   .then(response => response.json())
   .then(data => {
     console.log('result create api/v1/users:', data);
 });

}

const getAuthToken = async (web3Values: ActionData) => {
 const requestOptionsAuth = {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${apiKey}`
     },
   body: JSON.stringify(web3Values)
 };
 
 let auth;
 await fetch(`${API_URL}/api/v1/auth`, requestOptionsAuth)
   .then(response => response.json())
   .then(data => {
     auth = data;
     console.log(`result auth /api/v1/auth:`, data);
 });
 return auth;
}

const refreshAuthToken = async (accessToken: string, refreshToken: string, web3Values: ActionData) => {
  const requestOptionsAuth = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken} ${apiKey}`      
      },
    body: JSON.stringify({
      refreshToken: refreshToken
    })
  };
  
  let auth;
  await fetch(`${API_URL}/api/v1/auth/refresh-token`, requestOptionsAuth)
    .then(response => response.json())
    .then(data => {
      auth = data;
      console.log(`result auth /api/v1/auth/refresh-token:`, data);
  });
  return auth;
}

const getUserData = async (accessToken: string, web3Values: ActionData) => {
   const requestOptionsGetUser = {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${accessToken} ${apiKey}`
       },
   };

 let userData;
 await fetch(`${API_URL}/api/v1/users/${web3Values.address}`, requestOptionsGetUser)
   .then(response => response.json())
   .then(data => {
     userData = data;
     console.log(`result get users/${web3Values.address}:`, data);
 });
 return userData;
}

const getOwnerData = async (accessToken: string, web3Values: ActionData) => {
  const requestOptionsGetUser = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken} ${apiKey}`
      },
  };

let ownerData;
await fetch(`${API_URL}/api/v1/owners/${web3Values.address}`, requestOptionsGetUser)
  .then(response => response.json())
  .then(data => {
    ownerData = data;
    console.log(`result get owners/${web3Values.address}:`, data);
});
return ownerData;
}

const patchUserData = async (accessToken: string, web3Values: ActionData) => {
  const requestOptionsPatch = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken} ${apiKey}`},
    body: JSON.stringify(
      { 
        firstName: 'Joe'
      }
    )
  };
    
  await fetch(`${API_URL}/api/v1/users/${web3Values.address}`, requestOptionsPatch)
  .then(response => {
    console.log('result patch api/v1/users:', response);
  });
}

const putUserData = async (accessToken: string, web3Values: ActionData) => {

  const requestOptionsAuth = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken} ${apiKey}`      
      },
    body: JSON.stringify(
      { 
        firstName: 'Idris',
        lastName: 'Bowman',
        email: 'bowmanidris95@gmail.com',
        ens: 'idris.eth',
        permissionFlags: 1
      }
    )
  };
  
  await fetch(`${API_URL}/api/v1/users/${web3Values.address}`, requestOptionsAuth)
    .then(response => {
      console.log('result put api/v1/users:', response);
    });
}

const deleteUserData = async (accessToken: string, web3Values: ActionData) => {
  const requestOptionsGetUser = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken} ${apiKey}`
      },
  };

await fetch(`${API_URL}/api/v1/users/${web3Values.address}`, requestOptionsGetUser)
  .then(response => {
    console.log(`result dekete users/${web3Values.address}:`, response);
  });
}

const getUserAllData = async (accessToken: string, web3Values: ActionData) => {
  const requestOptionsGetUser = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken} dapp-1`
      },
  };

  let userData;
  await fetch(`http://localhost:80/api/v1/users/`, requestOptionsGetUser)
    .then(response => response.json())
    .then(data => {
      userData = data;
      console.log(`result get all users/:`, data);
  });
  return userData;
}

const getOwnerAllData = async (accessToken: string, web3Values: ActionData) => {
  const requestOptionsGetUser = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken} ${apiKey}`
      },
  };

  let userData;
  await fetch(`${API_URL}/api/v1/owners/`, requestOptionsGetUser)
    .then(response => response.json())
    .then(data => {
      userData = data;
      console.log(`result get all owners/:`, data);
  });
  return userData;
}

// test web3 connection component
const Template: ComponentStory<typeof Connection> = (args: ConnectionProps) =>
  <div>
      <Connection
      primary={true}
      backgroundcolor='green'
      size='large'
      verifyinglabel='Verifiying Signature...'
      dappname='Web3 Cloud'
      infuraId=''
      logourl='https://idrisbowman.com/images/idrisBowmanIcon.jpg'
      homePageurl='https://idrisbowman.com/'
      disableErrorDisplay={false}
      backend={{
        endpoint: 'http://localhost:8080/api/v1/auth/nonce',
        requestOptions: {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        }
      }}
      messageToSign={`Signing this unique message will produce a digital signature that we verify to prove ownership of your wallet. Please be aware that signing will not cost any gas!`}
      passweb3data={(async (web3Values: ActionData) => {
        web3data = web3Values;
        // try {
        //   switch(web3Values.actionType) {
        //     case 'SIGN_UP':
        //       await createUser(web3Values);
        //       const tokenResult: any = await getAuthToken(web3Values);
        //       await getUserData(tokenResult.accessToken, web3Values);
        //       break;
        //     case 'SIGN_IN':
        //       const tokenResultSignIn: any = await getAuthToken(web3Values);
        //       // dapp user or owner
        //       const getUserSignIn: any = await getUserData(tokenResultSignIn.accessToken, web3Values);
        //       // admin permission dapp Owner
        //       if (getUserSignIn.permissionFlags & 6 ) {
        //         await getUserAllData(tokenResultSignIn.accessToken, web3Values);
        //       }
        //       // admin permission web3 cloud app
        //       if (getUserSignIn.permissionFlags & 128) {
        //         await getOwnerAllData(tokenResultSignIn.accessToken, web3Values);
        //       }
        //       // await patchUserData(tokenResultSignIn.accessToken, web3Values);
        //       // await putUserData(tokenResultSignIn.accessToken, web3Values);
        //       // refresh token
        //       // const newTokenResultSignIn: any = await refreshAuthToken(tokenResultSignIn.accessToken, tokenResultSignIn.refreshToken, web3Values);
        //       // await getOwnerData(newTokenResultSignIn.accessToken, web3Values);
        //       // await deleteUserData(tokenResultSignIn.accessToken, web3Values);
        //       break;
        //   }
        // } catch(err) {
        //   console.log('error when trying to handle web3 data callback:', err)
        // }
      })}
      errorcallback={(async (error: ErrorMessageData) => {
        errorObject = error;
      })}   
    />
  </div>;
 
  

export const ConnectionStory = Template.bind({});

// test web3 results
export const web3DataContainer = () => 
  <div>
    {/* Web3 data BASE verification Type*/}
    {web3data && web3data.verificationType === 'EIP712'?
       <div>
         <h1>EIP712 Verification Type Data</h1>
       <a href={`${web3data.networkScanner}/${web3data.address}`} target="_blank" rel="noopener noreferrer">
         Ethereum Account: {web3data.address}
       </a> 
       <p>Email: {web3data.email}</p>
       <p>First Name: {web3data.firstName}</p>
       <p>Last Name: {web3data.lastName}</p>
       <p>Network: {web3data.networkName}</p>
       <p>NetworkID: {web3data.chainId}</p>
       <p>Action Type: {web3data.actionType}</p>
       <hr></hr>
       <p>Signature data</p>
       <p>Signatur: {web3data.signature}</p>
     </div>
      :
      <p>Please connect wallet to view Sing in with Ethereum</p>
    }

  {/* Error messages */}
    {
      errorObject ? 
      <p>{errorObject.message}</p>
      :
      <p></p>
    }
  </div>;
web3DataContainer.storyName = 'Web3 Connection data';
