import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, roleRequired }) => {
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const adminToken = useSelector((state) => state.admin.adminAToken);

  // Role-based route protection (admin, owner, or user)
  if (roleRequired === 'admin' && !adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  if (roleRequired === 'owner' && !userLoggedIn) {
    return <Navigate to="/host/login" replace />;
  }

  if (roleRequired === 'user' && !userLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated for the role, render the component
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
