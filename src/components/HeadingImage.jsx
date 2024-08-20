import { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Animate from "./animates";
import { imageAnimation } from "../utils";
import Header from "./header";
import PropTypes from "prop-types";
import Loading from "./loader";
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
const HeadingImage = ({ title, activeNav, image }) => {
  const smallScreen = useMediaQuery("(max-width:650px)");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (image && loading) {
      const img = new Image();
      img.src = image;
      setLoading(false);
    }
  }, [image]);

  return (
    <>
      <Loading loading={loading} />
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
    </>
  );
};
HeadingImage.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  activeNav: PropTypes.string.isRequired,
};
export default HeadingImage;
