import React from 'react';
import { ErrorMessageData, FormSignatureData } from '../interface/web3-data-interface';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Form, FormProps } from '../components/Form/Form';

export default {
  title: 'Components/Form',
  component: Form,
} as ComponentMeta<typeof Form>;

let web3data: FormSignatureData;
let errorObject: ErrorMessageData;
let API_URL: string = 'http://localhost:80';
const apiKey = '';

// test web3 Form component
const Template: ComponentStory<typeof Form> = (args: FormProps) =>
  <div>
      <Form
      primary={true}
      backgroundcolor='green'
      size='large'
      dappname='Your Brand Here'
      infuraId=''
      logourl='https://idrisbowman.com/images/idrisBowmanIcon.jpg'
      homePageurl='https://idrisbowman.com/'
      disableErrorDisplay={false}
      messageToSign={`Signing this unique message will produce a digital signature that we verify to prove ownership of your wallet. Please be aware that signing will not cost any gas!`}
      formDataCallback={(async (web3Values: FormSignatureData) => {
        web3data = web3Values;
      })}
      formErrorCallback={(async (error: ErrorMessageData) => {
        errorObject = error;
      })}   
      legalPolicy={
        [
            {
                name: 'Privacy Policy',
                url: 'https://www.secureauth3.com'
            },
            {
                name: 'Terms of Service',
                url: 'https://www.secureauth3.com'
            }
        ]
    }
    />
</div>;
 
export const FormStory = Template.bind({});
