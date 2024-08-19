import { Box, Typography } from "@mui/material";
import Animate from "./animates";
import { imageAnimation } from "../utils";
const Footer = () => {
  return (
    <Animate variants={imageAnimation}>
      <Box
        sx={{
          backgroundColor: "black",
          height: "100px",
          alignContent: "center",
        }}>
        <Typography
          style={{
            fontWeight: "bolder",
            color: "white",
            textAlign: "center",
          }}>
          <span style={{ letterSpacing: "-4px", fontFamily: "italic" }}>
            GRANITE &nbsp; GRILL
          </span>
          <span style={{ fontFamily: "inherit", marginLeft: "10px" }}>
            Find us on: 550 38e Avenue Lachine, H8T 2K4
          </span>
        </Typography>
      </Box>
    </Animate>
  );
};

export default Footer;
