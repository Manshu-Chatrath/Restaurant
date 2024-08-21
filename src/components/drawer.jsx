import { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  Box,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import HouseIcon from "@mui/icons-material/House";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../reducers/userSlice";
import { userLogin, getCartLength } from "../reducers/userSlice";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { List, ListItem } from "@mui/material";
const RightSideDrawer = ({ open, setOpen, activeNav }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const cartLength = useSelector((state) => state.user.cartLength);
  const isMobile = useMediaQuery("(max-width:450px)");
  const authenticatedUser = useSelector((state) => state.user.user);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (authenticatedUser && cartLength === 0) {
      dispatch(getCartLength({ id: authenticatedUser.cartId }));
    }
  }, [authenticatedUser, cartLength]);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          dispatch(
            userLogin({
              access_token: user.access_token,
              expires_in: user.expires_in,
              email: res.data.email,
              name: res.data.name,
              id: res.data.id,
            })
          );
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = async () => {
    googleLogout();
    localStorage.removeItem("user");
    dispatch(deleteUser());
    window.location.href = "/main";
  };

  const navItems = [
    {
      name: "Home",
      handleClick: () => navigate("/"),
      icon: <HouseIcon />,
    },
    {
      name: "Menu",
      handleClick: () => navigate("/menu"),
      icon: <MenuBookIcon />,
    },
    {
      name: "Cart",
      handleClick: () => navigate("/cart"),
      icon: (
        <div style={{ height: "25px", position: "relative" }}>
          <ShoppingCartIcon />
          <div
            style={{
              position: "absolute",
              height: "15px",
              backgroundColor: "red",
              width: "15px",
              color: "white",
              fontWeight: "bolder",
              borderRadius: "50%",
              fontSize: 11,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              top: -4,
              left: -3,
            }}>
            {cartLength}
          </div>
        </div>
      ),
    },
    {
      name: "Sigin In",
      handleClick: () => login(),
      icon: <HistoryEduIcon />,
    },
    {
      name: "Sign Out",
      icon: <LogoutIcon />,
      handleClick: () => logOut(),
    },
  ];
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };
  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          style: {
            width: isMobile ? "100%" : "300px",
            backgroundColor: "rgba(0,0,0,0.8)",
          },
        }}
        onClose={toggleDrawer(false)}>
        <Box style={{ position: "relative" }}>
          <IconButton
            onClick={() => {
              setOpen(false);
            }}
            sx={{
              position: "absolute",
              right: 8,
              zIndex: 1000,
              top: 8,
              color: "white",
            }}>
            <CloseIcon />
          </IconButton>
          <List style={{ width: "100%", paddingLeft: "20px" }}>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: "100px",
                marginTop: "20px",
                justifyContent: "center",
              }}>
              <Box>
                <Typography
                  variant="h4"
                  style={{
                    fontWeight: "bolder",
                    color: "white",
                    textAlign: "center",
                    letterSpacing: "-4px",
                    fontFamily: "italic",
                  }}>
                  GRANITE &nbsp; GRILL
                </Typography>
              </Box>
            </Box>
            {navItems.map((item, index) => {
              if (
                !authenticatedUser &&
                (item.name === "Orders" ||
                  item.name === "Sign Out" ||
                  item.name === "Cart")
              ) {
                return null;
              } else if (item.name === "Sigin In" && authenticatedUser) {
                return null;
              }
              return (
                <ListItem key={index} disablePadding>
                  <Button
                    sx={{
                      color: activeNav === item.name ? "white" : "gray",
                      fontWeight: "bolder",
                      width: "100%",
                      alignItems: "center",
                      padding: "0px",
                      marginBottom: "10px",
                      textAlign: "center",
                      fontSize: "20px",
                      justifyContent: "center",
                      display: "flex",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                    onClick={item.handleClick}
                    startIcon={item.icon}>
                    {item.name}
                  </Button>
                </ListItem>
              );
            })}
          </List>{" "}
        </Box>
      </Drawer>
    </>
  );
};

RightSideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  activeNav: PropTypes.string.isRequired,
};

export default RightSideDrawer;
