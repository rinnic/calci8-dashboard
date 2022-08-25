import Link from "next/link";
import { AppBar, Toolbar, Menu, MenuItem, Typography, Stack } from "@mui/material";

const Navigation = (props) => {
  return (
    <AppBar>
      <Toolbar>
       <Stack direction="row" spacing={2}>
          <Link href="/">Link1</Link>
          <Link href="/">Link2</Link>
          <Link href="/">Link3</Link>
       </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
