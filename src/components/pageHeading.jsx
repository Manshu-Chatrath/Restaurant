import { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Animate from "./animates";
import { imageAnimation } from "../utils";
import Loading from "./loader";
import Header from "./header";
import PropTypes from "prop-types";
const classes = {
  root: {
    width: "100vw",
    height: "80vh",
    position: "relative",
    backgroundSize: "cover",
    backgroundPosition: "bottom center",
    backgroundRepeat: "no-repeat",
  },
  overlay: {
    height: "80vh",
    width: "100vw",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 2,
  },
  content: {
    width: "100vw",
    zIndex: 3,
    height: "80vh",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: "white",
    capitalize: "uppercase",
    fontStyle: "oblique",
    fontFamily: "monospace",
  },
};
const PageHeading = ({ title, backgroundImage, activeNav }) => {
  const smallScreen = useMediaQuery("(max-width:650px)");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (backgroundImage) {
      setImage(backgroundImage);
    }

    return () => setImage(null);
  }, [backgroundImage]);

  return (
    <>
      {image ? (
        <Box sx={{ ...classes.root, backgroundImage: `url(${image})` }}>
          <Box sx={classes.overlay}></Box>
          <Animate variants={imageAnimation}>
            <Header activeNav={activeNav} />
            <Box sx={classes.content}>
              <Box>
                <Typography
                  variant={smallScreen ? "h2" : "h1"}
                  sx={classes.titleText}>
                  {title}
                </Typography>
              </Box>
            </Box>
          </Animate>
        </Box>
      ) : (
        <Loading loading={true} />
      )}
    </>
  );
};
PageHeading.propTypes = {
  title: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  activeNav: PropTypes.string.isRequired,
};
export default PageHeading;
