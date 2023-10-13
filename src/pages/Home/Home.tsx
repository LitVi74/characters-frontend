import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";

import { PATHS } from "../../constants/constants";
import { CurrentUserContext } from "../../contexts/currentUserContext";

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!currentUser.isActivated) {
      navigate(PATHS.login);
    } else {
      navigate(PATHS.characters);
    }
  });

  return <h1>Welcome</h1>;
}
