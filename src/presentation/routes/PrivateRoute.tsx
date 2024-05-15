import propTypes from "prop-types";
import useSession from "../../domain/hook/useSession.tsx";

const PrivateRoute = ({ children }) => {
    const session = useSession();
    if(!session.logged){
        let port = window.location.port === "" ? "" : `:${window.location.port}`;
        let url = `${window.location.protocol}//${window.location.hostname}${port}`;
        window.location.href = url;
    }
    return children;
};

PrivateRoute.propTypes = {
    children: propTypes.any
}

export default PrivateRoute;