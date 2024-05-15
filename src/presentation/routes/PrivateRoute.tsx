import useSession from "../../domain/hook/useSession.tsx";
import React from "react";

type PrivateRouteProps = {
    children: React.ReactNode
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const session = useSession();
    if (!session.logged) {
        let port = window.location.port === "" ? "" : `:${window.location.port}`;
        let url = `${window.location.protocol}//${window.location.hostname}${port}`;
        window.location.href = url;
    }
    return children;
};

export default PrivateRoute;