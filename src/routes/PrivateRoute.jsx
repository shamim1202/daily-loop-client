import { useContext } from "react";
import { Navigate } from "react-router";
import Loading from "../components/Loading/Loading";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading></Loading>;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/auth/login" replace></Navigate>;
};

export default PrivateRoute;
