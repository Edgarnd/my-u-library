import React from 'react';
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import PrivateRoute from "./presentation/routes/PrivateRoute.tsx";
import LoginView from "./presentation/view/LoginView.tsx";
import SessionProvider from './domain/provider/SessionProvider.tsx';
import MyHomeView from './presentation/usecases/student/MyHomeView.tsx';
import MyBooksView from './presentation/usecases/student/MyBooksView.tsx';
import HomeView from './presentation/usecases/librarian/HomeView.tsx';
import ThemeProviderCustom from './domain/provider/ThemeProviderCustom.tsx';
import SnackbarProvider from './domain/provider/SnackbarProvider.tsx';
import { AppSnackbar } from './presentation/components/shared/AppSnackbar.tsx';

class App extends React.Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<LoginView />}></Route>
                {/* These routes are for the student */}
                <Route
                    path="/my-home"
                    element={
                        <PrivateRoute>
                            <MyHomeView />
                        </PrivateRoute>
                    }></Route>
                <Route
                    path="/my-books"
                    element={
                        <PrivateRoute>
                            <MyBooksView />
                        </PrivateRoute>
                    }></Route>
                {/* These routes are for the librarian */}
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <HomeView />
                        </PrivateRoute>
                    }></Route>
            </Routes>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <ThemeProviderCustom>
        <BrowserRouter>
            <SessionProvider>
                <SnackbarProvider>
                    <AppSnackbar />
                    <App />
                </SnackbarProvider>
            </SessionProvider>
        </BrowserRouter>
    </ThemeProviderCustom>
);