import { Box, Typography, useMediaQuery } from "@mui/material";
import { imageAnimation, textAnimation } from "../utils";
import Animate from "./animates";
const classes = {
  root: {
    width: "100%",
    minHeight: "100vh",
    position: "relative",
    padding: "40px",
    backgroundColor: "#E5E4E6",
  },
};

const About = () => {
  const smallScreen = useMediaQuery("(max-width:500px)");
  return (
    <Box sx={classes.root}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: smallScreen ? "column-reverse" : "row",
        }}>
        <Animate variants={imageAnimation}>
          <Box>
            <img
              style={{
                width: smallScreen ? "100%" : "35vw",
                height: "80vh",
                marginTop: "5vh",
                backgroundColor: "white",
              }}
              src="https://media.istockphoto.com/id/1702321549/photo/an-empty-nightclub.jpg?s=2048x2048&w=is&k=20&c=Ju2fh5JNpjve39ogTKquy0TwB03baiQ0-7zODXa69fY="
            />
          </Box>
        </Animate>
        <Box
          style={{ width: smallScreen ? "100%" : "30vw", textAlign: "center" }}>
          <Animate variants={textAnimation}>
            <Typography style={{ textAlign: "center" }} variant="h3">
              About Us
            </Typography>

            <p>
              We believe that good food and a drink or two can bring people of
              all lifestyles together.
            </p>
            <p>
              Serving the kind of classic pub grub that everybody can enjoy, and
              screening all your favourite sports, We believe that good food and
              a drink or two can bring people of all lifestyles together.
              Serving the kind of classic pub grub that everybody can enjoy, and
              screening all your favourite sports,
            </p>
          </Animate>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
