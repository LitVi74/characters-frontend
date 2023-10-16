import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import { CurrentUserContext } from "../contexts/currentUserContext";
import { PATHS } from "../constants/constants";

export default function ProtectedRoute() {
  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (location.pathname === "/" && currentUser.isActivated) {
      navigate(PATHS.characters);
    }
  }, [location, navigate, currentUser]);

  return currentUser.isActivated ? <Outlet /> : <Navigate to={PATHS.login} replace />;
}
