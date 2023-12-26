import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useAppSelector((state) => state.user.loggedIn);
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
