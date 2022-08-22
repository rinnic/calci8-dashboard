import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const Home = (props) => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    router.push("/login");
  };

  return (
    <div>
      <h2>This is the logged in home page</h2>
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  );
};

export default Home;
