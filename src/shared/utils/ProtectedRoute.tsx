import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import user from "../contexts/userContext";
import { PATHS } from "../constants/constants";

const ProtectedRoute = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/" && user.data.isActivated) {
      navigate(PATHS.characters);
    }
  }, [location, navigate]);

  return user.data.isActivated ? <Outlet /> : <Navigate to={PATHS.login} replace />;
});

export default ProtectedRoute;
