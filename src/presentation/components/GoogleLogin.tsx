import React, { useRef } from "react";
import { useScript } from "../../domain/hook/useScript";
import jwt_deocde from "jwt-decode";
import useThemeCustom from "../../domain/hook/useThemeCustom.tsx";

const GoogleLogin = ({ responseGoogle }) => {
    const { isDarkMode } = useThemeCustom();
    const googlebuttonref = useRef();
    //const [user, setuser] = useState(false);
    const onGoogleSignIn = (user: any) => {
        let userCred = user.credential;
        let payload = jwt_deocde(userCred);
        //setuser(payload);
        responseGoogle(payload);
    };
    useScript("https://accounts.google.com/gsi/client", () => {
        window.google.accounts.id.initialize({
            client_id: '662459598762-90bs39f7q54ai4v1flljeu3o9d1453pe.apps.googleusercontent.com',
            callback: onGoogleSignIn,
            auto_select: false,
        });

        window.google.accounts.id.renderButton(googlebuttonref.current, {
            size: "large",
            type: "standard",
            theme: isDarkMode ? "filled_blue" : "outline",
            locale: "en_US",
            width: "280"
        });
    });
    return (
        <div>
            <div ref={googlebuttonref} style={{ display: 'inline-block' }}></div>
        </div>
    );
};

export default GoogleLogin;