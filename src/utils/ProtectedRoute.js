import { useContext } from 'react';
import { Navigate } from "react-router-dom";

import { CurrentUserContext } from '../contexts/currentUserContext';

export default function ProtectedRoute({ component: Component, ...props }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      {currentUser.isActivated ? (
        <Component {...props} /> 
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  )
}