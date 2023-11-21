import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { PATHS } from "../../shared/constants/constants";
import user from "../../shared/contexts/userContext";

const Home = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.data.isActivated) {
      navigate(PATHS.login);
    } else {
      navigate(PATHS.characters);
    }
  });

  return <h1>Welcome</h1>;
});

export default Home;
