// import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { SignIn, SignUp } from "./components";

export const CredentialsForm = () => {
  const routPath = useLocation().pathname.split("/")[1];

  return <>{routPath === "signin" ? <SignIn /> : <SignUp />}</>;
};
