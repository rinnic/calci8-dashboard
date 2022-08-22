import { Box, TextField, Button } from "@mui/material";
import { login } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const Login = (props) => {
  const [loginRequest, loginData] = useHttp(login);
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const username = useRef();
  const password = useRef();

  useEffect(() => {
    if (!loginData.error && !loginData.pending && loginData.data) {
      console.log(loginData.data.tokenData.token)
      authCtx.login(loginData.data.tokenData.token, loginData.data.tokenData.expiresIn);
      router.push("/home");
    }
  }, [loginData.error, loginData.pending, loginData.data]);

  const loginHandler = async (event) => {
    event.preventDefault();
    await loginRequest({
      username: username.current.value,
      password: password.current.value,
    });
    console.log(loginData)
  };

  

  return (
    <Box
      sx={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        border: "2px solid rgb(0, 99, 71)",
        borderRadius: "5px",
        padding: "2rem",
      }}
      component="form"
      onSubmit={loginHandler}
    >
      <TextField id="username" label="username*" inputRef={username} />
      <TextField
        id="password"
        type="password"
        label="password*"
        inputRef={password}
      />
      <Button
        id="login"
        type="submit"
        variant="contained"
        sx={{ backgroundColor: "rgb(0, 99, 71)" }}
      >
        SignUp
      </Button>
    </Box>
  );
};

export default Login;
