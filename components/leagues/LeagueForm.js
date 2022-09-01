import { OnDeviceTrainingTwoTone } from "@mui/icons-material";
import { Box, TextField, Button } from "@mui/material";
import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";

const LeagueForm = (props) => {
  const leagueName = useRef();
  const authCtx = useContext(AuthContext);

  const newLeagueHandler = (event) => {
    event.preventDefault();
    props.onCreate(leagueName.current.value, authCtx.token);
  };

  return (
    <Box component="form" onSubmit={newLeagueHandler}>
      <TextField
        id="leagueName"
        type="text"
        label="league name*"
        inputRef={leagueName}
      />
      <Button
        id="createLeagueBtn"
        type="submit"
        variant="contained"
        sx={{ backgroundColor: "rgb(0, 99, 71)" }}
      >
        Create
      </Button>
    </Box>
  );
};

export default LeagueForm;
