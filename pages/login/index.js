import { Box, TextField, Button } from "@mui/material";

const Login = (props) => {
  return (
    <Box sx={{
      width: "300px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      border: "2px solid rgb(0, 99, 71)",
      borderRadius: "5px",
      padding: "2rem",
    }}>
      <TextField id="username" label="username*"/>
      <TextField id="password" label="password*" />
      <Button id="login" type="submit" variant="contained" sx={{backgroundColor: "rgb(0, 99, 71)"}}>
        SignUp
      </Button>
    </Box>
  );
};

export default Login;
