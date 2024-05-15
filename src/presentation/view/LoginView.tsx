import React from 'react';
import { useNavigate } from "react-router-dom";

type LoginProps = {
    username?: string,
    password?: string,
};

type LoginState = {
    isLogged: boolean,
};

class LoginView extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            isLogged: false
        }
    }
    render() {
        const navigate = useNavigate();
        if (this.state.isLogged) {
            if (true) {
                navigate("/home");
            } else {
                navigate("/my-home");
            }
        }
        return (
            <>
                {/* <div className="container-fluid" style={{ minHeight: "100vh" }}>
                    <div className="row text-center align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                        <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 d-none d-md-block">
                            <img src={""} alt="Facturacion electronico ilustracion" className="img-fluid" style={{ maxWidth: "400px" }} />
                        </div>
                        <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 d-none d-md-block"></div>
                        <div className="col-10 col-xxl-5 col-xl-4 col-lg-4 col-md-5">
                            <form onSubmit={(e) => { }}>
                                <img src={""} alt="iBarber Banner" className="img-fluid" style={{ width: "200px", filter: `grayscale(${isDarkMode ? '100%' : '0%'}) brightness(${isDarkMode ? '100' : '1'})` }} />
                                <div style={{ height: "20px" }}></div>
                                <h5 style={{ textAlign: "left" }}><b>Bienvenido/a</b></h5>
                                <p style={{ textAlign: "left" }}>Ingresa con tu cuenta de usuario</p>
                                <InputTextForm
                                    type="text"
                                    placeholder="Usuario o correo electrónico"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                                <div style={{ height: "20px" }}></div>
                                <InputTextForm
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <div style={{ height: "10px" }}></div>
                                <div style={{ float: "right" }}>
                                    <ButtonLink />
                                </div>
                                <div style={{ height: "70px" }}></div>
                                <ButtonSubmit
                                    text="Iniciar sesión"
                                    type="submit"
                                    onClick={async () => {
                                        await keycloak.login()
                                    }} />
                            </form>
                        </div>
                    </div>
                </div> */}
            </>
        )
    }
}

// const FacebookLoginButton = () => {
//     const [login, setLogin] = useState(false);
//     const [data, setData] = useState({});
//     const [picture, setPicture] = useState('');
//     const [name, setName] = useState('');
//     const navigate = useNavigate();

//     const responseFacebook = (response) => {
//         // console.log(response);
//         // console.log(JSON.stringify(response));
//         setData(response);
//         setPicture(response.picture.data.url);
//         let email = `${response.userID}@facebook.com`;
//         if (response.accessToken) {
//             setLogin(true);
//             setName(response.name);
//             let rSocialNetLogin = new ResponseSocialNetLogin(response.userID, "FB", email, response.picture.data.url, response.name);
//             localStorage.setItem('response', JSON.stringify(rSocialNetLogin));
//             navigate("/add", { replace: true });
//         } else {
//             setLogin(false);
//         }
//     }

//     return (
//         <div style={{ display: 'inline-block', marginLeft: '10px', marginRight: '10px', top: '-15px', position: 'relative' }}>
//             {!login &&
//                 <FacebookLogin
//                     appId=""
//                     autoLoad={false}
//                     fields="name,email,picture"
//                     textButton=''
//                     buttonStyle={{ borderRadius: '100px', height: '50px', width: '50px', lineHeight: '0px', margin: '0px', paddingTop: '17px', paddingLeft: '18px' }}
//                     scope="public_profile,user_friends"
//                     callback={responseFacebook}
//                     disableMobileRedirect={true}
//                     icon="fa-facebook fa-lg" />
//             }
//             {login &&
//                 <img src={picture} style={{ borderRadius: '100px' }} />
//             }
//             {login && <p>{name}</p>}
//         </div>
//     )
// };

// const GoogleLoginButton = () => {
//     const [login, setLogin] = useState(false);
//     const [data, setData] = useState({});
//     const [picture, setPicture] = useState('');
//     const [name, setName] = useState('');
//     const navigate = useNavigate();

//     const responseGoogle = (response) => {
//         // console.log(JSON.stringify(response));
//         setData(response);
//         setPicture(response.picture);
//         if (response.jti) {
//             setLogin(true);
//             setName(response.name);
//             let rSocialNetLogin = new ResponseSocialNetLogin(response.email, "GO", response.email, response.picture, response.name);
//             localStorage.setItem('response', JSON.stringify(rSocialNetLogin));
//             navigate("/add", { replace: true });
//         } else {
//             setLogin(false);
//         }
//     }

//     return (
//         <div style={{ display: 'inline-block', marginLeft: '10px', marginRight: '10px' }}>
//             {!login &&
//                 <GoogleLogin
//                     responseGoogle={responseGoogle} />
//             }
//             {login &&
//                 <img src={picture} style={{ borderRadius: '100px' }} />
//             }
//             {login && <p>{name}</p>}
//         </div>
//     )
// };

export default LoginView;