import Link from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  Stack,
  Button,
} from "@mui/material";

import AuthContext from "../../store/auth-context";
import { useContext } from "react";

const Navigation = (props) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const loginHandler = () => {
    console.log("aaa");
    router.push("/login");
  };

  const logoutHandler = () => {
    authCtx.logout();
    router.push("/");
  };

  const authButton = authCtx.isLoggedIn ? (
    <Button onClick={logoutHandler}>Logout</Button>
  ) : (
    <Button onClick={loginHandler}>Login</Button>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgb(0, 0, 102)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack direction="row" spacing={2}>
          <Link href="/">Link1</Link>
          <Link href="/">Link2</Link>
          <Link href="/">Link3</Link>
        </Stack>
        {authButton}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
