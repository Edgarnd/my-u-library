import { Route, Routes, BrowserRouter } from 'react-router-dom';
import PrivateRoute from "./presentation/routes/PrivateRoute";
import LoginView from "./presentation/view/LoginView";
import React from 'react';
import ReactDOM from "react-dom/client";

class App extends React.Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<LoginView />}></Route>
                <Route
                    path="/my-home"
                    element={
                        <PrivateRoute>
                            <LoginView />
                        </PrivateRoute>
                    }></Route>
            </Routes>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);