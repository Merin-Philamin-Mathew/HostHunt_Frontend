import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user, owner, admin } = useSelector((state) => state);
  
  // Role-based route protection (admin, owner, or user)
  if (roleRequired === 'admin' && !user.userLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  if (roleRequired === 'owner' && !user.userLoggedIn) {
    return <Navigate to="/host/login" replace />;
  }

  if (roleRequired === 'user' && !user.userLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated for the role, render the component
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
