import { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";

import { CurrentUserContext } from '../contexts/currentUserContext';

export default function ProtectedRoute() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      {currentUser.isActivated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  )
}