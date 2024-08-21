import { useState } from "react";
import Drawer from "./drawer";
import PropTypes from "prop-types";
import { Box, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const Header = ({ activeNav }) => {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "absolute",
          borderBottom: "1px solid white",
          width: "100%",
          zIndex: 30,
        }}>
        <Box>
          <Typography
            variant="h4"
            style={{
              fontWeight: "bolder",
              color: "white",
              letterSpacing: "-4px",
              fontFamily: "italic",
            }}>
            GRANITE &nbsp; GRILL
          </Typography>
        </Box>
        <Box sx={{ zIndex: 200 }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerOpen}
            aria-label="menu"
            sx={{ color: "white", mr: 2, cursor: "pointer" }} // Set color to white here
          >
            <MenuIcon style={{ fontSize: "35px" }} />
          </IconButton>
        </Box>
      </Box>
      <Drawer activeNav={activeNav} open={open} setOpen={setOpen} />
    </>
  );
};
Header.propTypes = {
  activeNav: PropTypes.string.isRequired,
};

export default Header;
