import { Box, TextField, Button } from "@mui/material";
import { signup } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

const Signup = (props) => {
  const [signupRequest, signupData] = useHttp(signup);
  const router = useRouter();

  const username = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  useEffect(() => {
    if (!signupData.error && !signupData.pending && signupData.data) {
      if(!signupData.data.ok) {
        console.log("Username already taken!");
      }
      router.push("/login");
    }
  }, [signupData.error, signupData.pending, signupData.data]);

  const signupHandler = async (event) => {
    event.preventDefault();
    await signupRequest({
      username: username.current.value,
      password: password.current.value,

    });
    console.log(signupData)
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
      onSubmit={signupHandler}
    >
      <TextField id="username" label="username*" inputRef={username} />
      <TextField
        id="password"
        type="password"
        label="password*"
        inputRef={password}
      />
      <TextField
        id="consfirmPassword"
        type="consfirmPassword"
        label="confirm password*"
        inputRef={confirmPassword}
      />
      <Button
        id="signup"
        type="submit"
        variant="contained"
        sx={{ backgroundColor: "rgb(0, 99, 71)" }}
      >
        SignUp
      </Button>
    </Box>
  );
};

export default Signup;
