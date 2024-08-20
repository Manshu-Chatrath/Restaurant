import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";
import menuPic1 from "../assets/mainPic3.jpeg";
import menuPic2 from "../assets/mainPic2.jpeg";
import menuPic3 from "../assets/mainPic1.jpeg";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Header from "./header";
import Animate from "./animates";
import { imageAnimation } from "../utils";
import Loading from "./loader";

const slideShow = keyframes`
  0% { background-image: url(${menuPic1}); }
  33% { background-image: url(${menuPic2}); }
  66% { background-image: url(${menuPic3}); }
  100% {background-image: url(${menuPic1}); }
`;

const classes = {
  root: {
    width: "100vw",
    height: "100vh",
    animation: `${slideShow} 15s infinite `,
    position: "relative",
    backgroundSize: "cover",
    backgroundPosition: "bottom center",
    backgroundRepeat: "no-repeat",
  },
  overlay: {
    height: "100vh",
    width: "100vw",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 2,
  },
  content: {
    width: "100vw",
    zIndex: 3,
    height: "100vh",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    maxHeight: "300px",
    justifyContent: "center",
    display: "flex",
  },
  titleBox: {
    marginRight: "20px",
  },
  titleText: {
    color: "white",
  },
  borderLeft: {
    borderLeft: "2px solid white",
    color: "white",
  },
  subtitleContainer: {
    marginLeft: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitleText: {
    color: "white",
    textAlign: "center",
  },

  orderText: {
    fontWeight: "bolder",
    display: "flex",
    justifyContent: "center",
    color: "whitesmoke",
    letterSpacing: "2px",
    marginBottom: "10px",
    marginTop: "20px",
  },
  button: {
    backgroundColor: "#dc3545",
    width: "150px",
  },
};

const Main = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const handleClick = () => navigate("/menu");
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const smallScreen = useMediaQuery("(max-width:650px)");
  const preloadImages = (images) => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    return true;
  };

  useEffect(() => {
    if (menuPic1 && menuPic2 && menuPic3) {
      const l = preloadImages([menuPic1, menuPic2, menuPic3]);
      if (l) {
        setLoading(false);
      }
    }
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <Box sx={classes.root}>
        <Box sx={classes.overlay}></Box>
        <Animate variants={imageAnimation}>
          <Header activeNav={"Home"} />
          <Box sx={classes.content}>
            <Box style={{ flexDirection: "row" }} sx={classes.titleContainer}>
              <Box sx={classes.titleBox}>
                <Box>
                  <Typography
                    variant={smallScreen ? "h2" : isSmallScreen ? "h3" : "h1"}
                    sx={classes.titleText}>
                    GRANITE
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "end" }}>
                  <Typography
                    variant={smallScreen ? "h2" : isSmallScreen ? "h3" : "h1"}
                    sx={classes.titleText}>
                    GRILL
                  </Typography>
                </Box>
              </Box>
              {!smallScreen && (
                <React.Fragment>
                  <Box sx={classes.borderLeft}></Box>
                  <Box sx={classes.subtitleContainer}>
                    <Box>
                      <Typography variant="h4" sx={classes.subtitleText}>
                        {`Montreal's one of the best`}
                      </Typography>
                      <Typography variant="h4" sx={classes.subtitleText}>
                        restaurant!
                      </Typography>
                    </Box>
                  </Box>
                </React.Fragment>
              )}
            </Box>

            <Box sx={classes.orderText}>Place an order</Box>
            <Box>
              <Button
                startIcon={<ShoppingBasketIcon />}
                sx={classes.button}
                onClick={handleClick}
                variant="contained">
                Pickup
              </Button>
            </Box>
            <Box>
              <img
                style={{ marginTop: "20px", width: "150px" }}
                src="https://refectory.com/wp-content/uploads/2020/02/design_image_opentable_dc2020-badge-mark-only-2x_121719-1-600x600.png"
              />
            </Box>
          </Box>
        </Animate>
      </Box>
    </>
  );
};

export default Main;
