import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function GuestRoute({ children }) {
    const { isAuthenticated, loading } = useSelector(
        state => state.auth
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated
        ? <Navigate to="/" replace />
        : children;
}

export default GuestRoute;