import { Box, Typography, useMediaQuery } from "@mui/material";
import Animate from "./animates";
import { imageAnimation, textAnimation } from "../utils";
const classes = {
  root: {
    width: "100%",
    height: "100%",
    position: "relative",
    padding: "40px",
  },
};

const OurStory = () => {
  const smallScreen = useMediaQuery("(max-width:500px)");
  return (
    <Box sx={classes.root}>
      <Box
        sx={{
          display: "flex",
          flexDirection: smallScreen ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}>
        <Animate variants={textAnimation}>
          <Box
            style={{
              width: smallScreen ? "100%" : "30vw",
              textAlign: "center",
            }}>
            <Typography style={{ textAlign: "center" }} variant="h3">
              Our Passion,Our Story
            </Typography>
            <p>
              Granite Grill is Montreal’s very first vegan pub! Situated at the
              corner of Boulevard St. Laurent and Des Pins, Granite Grill
              presents a pub-style comfort food and drinks menu that is 100%
              plant-based. Granite Grill is a community and space where non-meat
              eaters and the most hardcore meat-eaters can mingle and enjoy all
              that a conventional pub has to offer.
            </p>
            <p>
              Here at Granite Grill, we want YOU to experience what plant-based
              pub food means, and we want you to bring your friends and family
              to come and enjoy delicious food, washed down with a cold
              refreshing glass or two of your favourite tipple offer.
            </p>
          </Box>
        </Animate>
        <Animate variants={imageAnimation}>
          <Box>
            <img
              style={{
                width: smallScreen ? "100%" : "35vw",
                height: "80vh",
                marginTop: "5vh",
                backgroundColor: "white",
              }}
              src="https://plus.unsplash.com/premium_photo-1664373232947-19aed5052584?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Box>
        </Animate>
      </Box>
    </Box>
  );
};

export default OurStory;
