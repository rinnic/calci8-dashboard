import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import React from "react";

const Home = (props) => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    router.push("/login");
  };


  const leaguesButtonHandler = () => {
    router.push("/leagues");
  };


  return (
      <div>
        <h2>This is the logged in home page</h2>
        <Button onClick={logoutHandler}>Logout</Button>
        <Button onClick={leaguesButtonHandler}>Your Leagues</Button>
      </div>
     
  );
};

export default Home;
