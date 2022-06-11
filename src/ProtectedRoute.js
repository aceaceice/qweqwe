import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
const ProtectedRoute = () => {
  const auth = useSelector((state) => state.auth.user);
  return !!auth ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
