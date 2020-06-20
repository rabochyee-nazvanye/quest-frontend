import React from 'react'

import './FormTemplate.css'

import { Button } from 'antd'

import { GoogleOutlined } from "@ant-design/icons";

import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../../settings'

export const GOOGLE_AUTH = 'google'
//TODO(tramakarov): Add GitHub authentication
export const GITHUB_AUTH = 'github'


export default function OAuthLoginButton(props) {
    switch (props.authProvider) {
        case GOOGLE_AUTH:
            return (
                <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    render={renderProps => (
                        <Button className='oauth-button' icon={<GoogleOutlined />} onClick={renderProps.onClick} disabled={renderProps.disabled}>{props.buttonText}</Button>
                    )}
                    buttonText={props.buttonText}
                    onSuccess={
                        (response) =>
                            props.oAuth({tokenId: response.tokenId, oAuthProvider: GOOGLE_AUTH})}
                    onFailure={
                        (response) =>
                            props.oAuth({tokenId: response.tokenId, oAuthProvider: GOOGLE_AUTH})}
                />
            )
    }
}
