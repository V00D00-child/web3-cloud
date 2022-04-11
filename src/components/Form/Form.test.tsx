import React from "react";
import { render } from "@testing-library/react";
import "regenerator-runtime/runtime.js";
import { ActionData, ErrorMessageData } from "../../interface/web3-data-interface";
import { Form } from "./Form";

describe("Form", () => {
    let web3data: ActionData;
    let errorObject: ErrorMessageData;

    test("renders the Form component", () => {
        render(<Form
            primary={true}
            backgroundcolor='blue'
            size='large'
            verifyinglabel='Verfiying Signature...'
            dappname='Web3 Cloud'
            homePageurl='https://idrisbowman.com/'
            logourl='https://idrisbowman.com/images/idrisBowmanIcon.jpg'
            passweb3data={((web3Values: ActionData) => {
                web3data = web3Values;
            })}
            errorcallback={((error: ErrorMessageData) => {
                errorObject = error;
            })} 
            infuraId={''}
            disableErrorDisplay={false}
            messageToSign={""} 
            />);
    });
});