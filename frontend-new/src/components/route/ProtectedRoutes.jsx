import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../layouts/Loader';

export default function ProtectedRoute ({children, isAdmin}) {
    const { isAuthenticated, loading, user } = useSelector(state => state.authState)

    // 1. If still loading user data, show the spinner (don't kick them out yet)
    if(loading) {
        return <Loader/>;
    }

    // 2. If finished loading and NOT authenticated, kick them to Login
    if(!isAuthenticated) {
        return <Navigate to="/login" />
    }

    // 3. (Optional) If it's an Admin route and user is NOT admin, kick them to Home
    if(isAdmin && user.role !== 'admin') {
        return <Navigate to="/" />
    }

    // 4. If all checks pass, show the page!
    return children;
}