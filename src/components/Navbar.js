import React, { useState } from "react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RightDrawer from "./RightDrawer";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const close = () => setOpen(false);
  return (
    <AppBar className="navbar">
      <Toolbar>
        <Container>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Sterling Energy
            </Typography>
            <div>
              <MenuIcon onClick={toggle} />
            </div>
          </div>
        </Container>
      </Toolbar>
      <RightDrawer open={open} close={close} />
    </AppBar>
  );
};

export default Navbar;
