import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import InputTextForm from '../components/form/InputTextForm.tsx';
import ButtonPrimary from '../components/form/ButtonPrimary.tsx';
import GoogleLogin from '../components/GoogleLogin.jsx';
import { Typography } from '@mui/material';
import { auth } from '../../domain/util/firebase.ts';
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import useSession from '../../domain/hook/useSession.tsx';
import useLogin from '../../domain/hook/useLogin.tsx';
import { useSnackbarContext } from '../../data/context/snackbarContext.ts';

const LoginView: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { showSnackbar } = useSnackbarContext();
    const navigate = useNavigate();
    const session = useSession();
    const {
        getUserInfo
    } = useLogin();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginCredentials();
    };
    const loadOptionsRole = async () => {
        let userInfo = await getUserInfo();
        if (userInfo !== undefined && userInfo !== null) {
            session.id = userInfo.id.toString();
            session.role = userInfo.role;
            session.options = userInfo.options;
            if(session.role.toLowerCase() === "student"){
                navigate!("/my-home");
            } else {
                navigate!("/home");
            }
        } else {
            showSnackbar("An error ocurred, please report it with the administration")
        }
    };
    const loginCredentials = async () => {
        try {
            let userCredential: UserCredential = await signInWithEmailAndPassword(auth, username, password)
            if (userCredential !== null && userCredential !== undefined) {
                if (userCredential.user !== null && userCredential.user !== undefined) {
                    if (!userCredential.user.isAnonymous) {
                        session!.email = userCredential.user.email ?? "";
                        session!.name = userCredential.user.displayName ?? userCredential.user.email?.split("@")[0] ?? "";
                        session!.logged = true;
                        loadOptionsRole();
                    } else {
                        showSnackbar("Your account cant login here, please report it with the administration");
                    }
                } else {
                    showSnackbar("Something is happening which your login, please report it with the administration");
                }
            } else {
                showSnackbar("You cant sign in, please report it with the administration");
            }
        } catch (error: any) {
            showSnackbar("You cant sign in, please report it with the administration");
        }
    };
    return (
        <>
            <div className="container-fluid" style={{ minHeight: "100vh" }}>
                <div className="row text-center align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                    <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 d-none d-md-block">
                        <img src="/images/anim/reading_books.png" alt="My U Library Illustration" className="img-fluid" style={{ maxWidth: "400px" }} />
                    </div>
                    <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 d-none d-md-block"></div>
                    <div className="col-10 col-xxl-5 col-xl-4 col-lg-4 col-md-5">
                        <form onSubmit={handleSubmit}>
                            <h3>My U Library</h3>
                            <div style={{ height: "20px" }}></div>
                            <h5 style={{ textAlign: "left" }}><b>Welcome!</b></h5>
                            <p style={{ textAlign: "left" }}>Sign in with your user account</p>
                            <InputTextForm
                                type="text"
                                placeholder="Email"
                                required={true}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <div style={{ height: "20px" }}></div>
                            <InputTextForm
                                type="password"
                                placeholder="Password"
                                required={true}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div style={{ height: "40px" }}></div>
                            <ButtonPrimary
                                text="Login"
                                type="submit"
                                onClick={() => { }}
                            />
                            <div style={{ height: "10px" }}></div>
                            <Typography>Or</Typography>
                            <div style={{ height: "10px" }}></div>
                            <GoogleLoginButton
                                loadOptionsRole={loadOptionsRole} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export interface GoogleLoginButtonProps {
    loadOptionsRole: () => Promise<void>;
}

const GoogleLoginButton = ({ loadOptionsRole }: GoogleLoginButtonProps) => {
    const [login, setLogin] = useState(false);
    const { showSnackbar } = useSnackbarContext();
    const navigate = useNavigate();
    const session = useSession();
    const {
        registerUser
    } = useLogin();

    const responseGoogle = async (response: any) => {
        // setPicture(response.picture);
        if (response.jti) {
            session.email = response.email;
            session.name = response.name;
            session.logged = true;
            let userIsRegistered = await registerUser();
            if (userIsRegistered) {
                loadOptionsRole();
            } else {
                showSnackbar("You cant sign ing, please report it with the administration");
            }
        } else {
            showSnackbar("You cant sign ing, please report it with the administration");
            setLogin(false);
        }
    }

    return (
        <div style={{ display: 'inline-block', marginLeft: '10px', marginRight: '10px' }}>
            {!login &&
                <GoogleLogin
                    responseGoogle={responseGoogle} />
            }
        </div>
    )
};

export default LoginView;