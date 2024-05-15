import React, { useState, Component, useRef } from "react";
import { useScript } from "../hook/useScript";
import jwt_deocde from "jwt-decode";

const GoogleLogin = ({ responseGoogle }) => {
    const googlebuttonref = useRef();
    //const [user, setuser] = useState(false);
    const onGoogleSignIn = (user) => {
        let userCred = user.credential;
        let payload = jwt_deocde(userCred);
        //setuser(payload);
        responseGoogle(payload);
    };
    useScript("https://accounts.google.com/gsi/client", () => {
        window.google.accounts.id.initialize({
            client_id: '27613329395-o92pu0fbrmc9hg27ak774m27k7nsha2q.apps.googleusercontent.com',
            callback: onGoogleSignIn,
            auto_select: false,
        });

        window.google.accounts.id.renderButton(googlebuttonref.current, {
            size: "large",
            type: "icon",
            shape: "circle"
        });
    });
    return (
        <div>
            <div ref={googlebuttonref} style={{ transform: 'scale(1.25, 1.25)', display: 'inline-block' }}></div>
        </div>
    );
};

export default GoogleLogin;