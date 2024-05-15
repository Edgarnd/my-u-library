import propTypes from "prop-types";

const PrivateRoute = ({ children }) => {
    return children;
};

PrivateRoute.propTypes = {
    children: propTypes.any
}

export default PrivateRoute;