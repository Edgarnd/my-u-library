import React, { useState } from 'react';
import { NavigateFunction, useNavigate, useNavigation } from "react-router-dom";
import InputTextForm from '../components/form/InputTextForm.tsx';
import ButtonPrimary from '../components/form/ButtonPrimary.tsx';
import GoogleLogin from '../components/GoogleLogin.tsx';
import { Typography } from '@mui/material';
import { auth } from '../../domain/util/firebase.ts';
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import useSession from '../../domain/hook/useSession.tsx';
import { OptionRole } from '../../data/model/OptionRole.ts';
import { Session } from '../../data/model/Session.ts';

type LoginProps = {
    username?: string,
    password?: string,
    session: Session,
    navigate: NavigateFunction
};

type LoginState = {
    username: string,
    password: string,
};

class LoginView extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }
    async loginCredentials(e): Promise<void> {
        if (e !== undefined) {
            e.preventDefault();
        }
        let userCredential: UserCredential = await signInWithEmailAndPassword(auth, this.state.username, this.state.password)
        if (userCredential !== null && userCredential !== undefined) {
            if (userCredential.user !== null && userCredential !== undefined) {
                if (!userCredential.user.isAnonymous) {
                    this.props.session.id = userCredential.user.uid;
                    this.props.session.email = userCredential.user.email ?? "";
                    this.props.session.name = userCredential.user.displayName ?? userCredential.user.email?.split("@")[0] ?? "";
                    this.props.session.logged = true;
                    this.props.navigate("/my-home");
                }
            }
        }
    };
    render() {
        return (
            <>
                <div className="container-fluid" style={{ minHeight: "100vh" }}>
                    <div className="row text-center align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                        <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 d-none d-md-block">
                            <img src="/images/anim/reading_books.png" alt="My U Library Illustration" className="img-fluid" style={{ maxWidth: "400px" }} />
                        </div>
                        <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 d-none d-md-block"></div>
                        <div className="col-10 col-xxl-5 col-xl-4 col-lg-4 col-md-5">
                            <form onSubmit={(e) => {
                                this.loginCredentials(e);
                            }}>
                                <h3>My U Library</h3>
                                <div style={{ height: "20px" }}></div>
                                <h5 style={{ textAlign: "left" }}><b>Welcome!</b></h5>
                                <p style={{ textAlign: "left" }}>Sign in with your user account</p>
                                <InputTextForm
                                    type="text"
                                    placeholder="Email"
                                    required={true}
                                    value={this.state.username}
                                    onChange={(target) => this.setState({ ...this.state, username: target.value })}
                                />
                                <div style={{ height: "20px" }}></div>
                                <InputTextForm
                                    type="password"
                                    placeholder="Password"
                                    required={true}
                                    value={this.state.password}
                                    onChange={(target) => this.setState({ ...this.state, password: target.value })}
                                />
                                <div style={{ height: "40px" }}></div>
                                <ButtonPrimary
                                    text="Login"
                                    type="submit"
                                    onClick={() => {
                                        this.loginCredentials(undefined)
                                    }} />
                                <div style={{ height: "10px" }}></div>
                                <Typography>Or</Typography>
                                <div style={{ height: "10px" }}></div>
                                <GoogleLoginButton />
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const GoogleLoginButton = () => {
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();
    const session = useSession();

    const responseGoogle = (response) => {
        // setPicture(response.picture);
        if (response.jti) {
            session.id = response.jti;
            session.email = response.email;
            session.name = response.name;
            session.logged = true;
            //Load roles
            session.options = [
                new OptionRole("Home", "/my-home", "home"),
                new OptionRole("Books", "/my-books", "menu_book")
            ];
            if (session.role.toLowerCase() === "student") {
                // navigate("/add", { replace: true });
                navigate("/my-home");
            } else {
                navigate("/my-home");
            }
        } else {
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

export default function(props: LoginProps) {
    const navigate = useNavigate();
    const session = useSession();
  
    return <LoginView {...props} session={session} navigate={navigate} />;
  }