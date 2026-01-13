import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import share from '../assets/share.mp4';
import logowhite from '../assets/logowhite.png'
import { client } from '../client';
import { jwtDecode } from 'jwt-decode';

const Login = () => {

    const navigate = useNavigate();
    
    const handleGoogleResponse = (response) => {
        const decoded = jwtDecode(response.credential);
        const { name, sub, picture } = decoded;

        localStorage.setItem('user', JSON.stringify(decoded));

        const doc = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture,
        };

        client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true });
        });
    };

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video 
                    src={share}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                <div className="p-5">
                    <img src={logowhite} width="130px" alt="logo"/>
                </div>
                <div className="shadow-2xl">
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
                        <GoogleLogin
                            onSuccess={(response) => {
                                console.log(response);
                                handleGoogleResponse(response);
                            }}
                            onError={() => console.log('Login Failed')}
                        />
                    </GoogleOAuthProvider>
                </div>
            </div>
        </div>
    )
}

export default Login