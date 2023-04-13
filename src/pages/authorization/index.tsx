import {Outlet} from 'react-router-dom';
import AuthorizationButtonGroup from "../../components/authorization button group";
import {Stack} from "react-bootstrap";
import  "./authorization.scss"

const Authorization = () => {
  return (
    <Stack
      as="main"
      className="authorization flex-grow-1 align-content-center align-self-center"
    >
      <AuthorizationButtonGroup />
      <Outlet />
    </Stack>
  );
};

export default Authorization;