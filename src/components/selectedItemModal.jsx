import React, { useState, useEffect, memo } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { defaultSelectedItemStatus } from "../reducers/itemsSlice";
import { useGoogleLogin } from "@react-oauth/google";
import {
  addToCart,
  editCartItem,
  userLogin,
  defaultCartStatus,
} from "../reducers/userSlice";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExtraItem from "./extraItem";
import axios from "axios";
import moment from "moment-timezone";
import PropTypes from "prop-types";

const SelectedItemModal = memo(function SelectedItemModal({
  selectedItem,
  selectedCartItem = null,
  isEdit = false,
}) {
  const smallScreen = useMediaQuery("(max-width:500px)");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: smallScreen ? "none" : "20px",
    textAlign: "center",
    width: smallScreen ? "80%" : "500px",
    maxHeight: "80%",
    overflowY: "auto",
    overflowX: "hidden",
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  };
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state.user.user);
  const [authUser, setAuthUser] = useState(null);
  const [extras, setExtras] = useState([]);
  const [price, setPrice] = useState(+selectedItem.price);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setAuthUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (selectedCartItem) {
      setQuantity(selectedCartItem.quantity);
      const arr = [];
      if (selectedCartItem?.extraItems?.length > 0) {
        selectedCartItem.extraItems.map((item) => {
          arr.push({ id: item.id, extraItems: item.items.map((i) => i.id) });
        });
        setExtras(arr);
      }
      setPrice(+selectedCartItem.price);
    }
  }, [selectedCartItem]);

  useEffect(() => {
    return () => dispatch(defaultCartStatus());
  }, []);

  useEffect(() => {
    if (authUser) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${authUser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${authUser.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          dispatch(
            userLogin({
              access_token: authUser.access_token,
              expires_in: authUser.expires_in,
              email: res.data.email,
              name: res.data.name,
              id: res.data.id,
            })
          );
        })
        .catch((err) => console.log(err));
    }
  }, [authUser]);

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(defaultSelectedItemStatus());
  };
  const calculateDiscount = () => {
    return (
      selectedItem.price - (selectedItem.price * selectedItem.discount) / 100
    );
  };
  const addQuantity = () => {
    const qty = quantity + 1;
    const totalPrice = qty * selectedItem.price;
    setPrice(totalPrice);
    setQuantity(qty);
  };

  const removeQuantity = () => {
    if (quantity > 1) {
      const qty = quantity - 1;
      const totalPrice = qty * selectedItem.price;
      setPrice(totalPrice);
      setQuantity(qty);
    }
  };
  const handleClick = () => {
    if (!user) {
      login();
    } else {
      if (isEdit) {
        dispatch(
          editCartItem({
            cartId: user.cartId,
            id: selectedItem.id,
            cartItemId: selectedCartItem.id,
            price: price,
            quantity: quantity,
            extras: extras,
            name: selectedItem.name,
          })
        );
      } else {
        dispatch(
          addToCart({
            cartId: user.cartId,
            id: selectedItem.id,
            price: price,
            quantity: quantity,
            extras: extras,
            name: selectedItem.name,
          })
        );
      }
    }
  };

  const handleClose = () => {
    dispatch(defaultSelectedItemStatus());
  };

  return (
    <Modal
      open={selectedItem ? true : false}
      onClose={onClose}
      aria-labelledby="status-modal-title"
      aria-describedby="status-modal-description">
      <Box sx={style} style={{ height: smallScreen ? "100%" : {} }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
          }}>
          <div
            style={{
              width: smallScreen ? "100vw" : "500px",
              paddingTop: "56.25%",
              backgroundImage: `url(${selectedItem?.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderTopLeftRadius: smallScreen ? "none" : "15px",
              borderTopRightRadius: smallScreen ? "none" : "15px",
              backgroundRepeat: "no-repeat",
            }}
          />
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              color: "gray",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}>
            <CloseIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
        <Box style={{ padding: "0 10px", width: "100%" }}>
          <Typography
            variant="h4"
            style={{ fontWeight: "bold", textAlign: "left", fontSize: "25px" }}>
            Name: {selectedItem.name}
          </Typography>
          <Typography
            variant="h4"
            style={{
              marginTop: "5px",
              fontWeight: "bold",
              fontSize: "25px",
              color: "gray",
              textAlign: "left",
            }}>
            Price:{" "}
            {moment.utc().valueOf() >= selectedItem?.discountStartTime &&
            moment.utc().valueOf() < selectedItem?.discountEndTime &&
            selectedItem?.discount ? (
              <>
                <span>{"$" + calculateDiscount()}</span>
                <span
                  style={{
                    marginLeft: "10px",
                    color: "red",
                    textDecoration: "line-through",
                  }}>
                  {"$" + selectedItem.price}
                </span>
              </>
            ) : (
              "$" + selectedItem.price
            )}
          </Typography>
          <Typography
            variant="p"
            component={"p"}
            style={{
              marginTop: "5px",
              color: "black",
              textAlign: "left",
            }}>
            {selectedItem.description}
          </Typography>
          {selectedItem?.extras.map((extra, index) => (
            <React.Fragment key={index}>
              <ExtraItem
                setExtras={setExtras}
                price={price}
                setPrice={setPrice}
                extras={extras}
                isEdit={isEdit}
                item={extra}
              />
            </React.Fragment>
          ))}
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <IconButton
              style={{
                backgroundColor: "#DDDDDD",
                marginRight: "10px",
              }}
              onClick={removeQuantity}>
              <RemoveIcon />
            </IconButton>
            <Box style={{ fontWeight: "bold" }}>Quantity: {quantity}</Box>
            <Box>
              <IconButton
                style={{
                  backgroundColor: "#DDDDDD",
                  marginLeft: "10px",
                }}
                onClick={addQuantity}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          <Box style={{ fontWeight: "bold", marginTop: "10px" }}>
            Total Price: ${price}
          </Box>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              width: "100%",
              backgroundColor: "black",
              marginTop: "10px",
              marginBottom: "20px",
              "&:hover": {
                backgroundColor: "black",
              },
            }}>
            {isEdit ? "Update Cart" : "Add To Cart"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
});
SelectedItemModal.propTypes = {
  selectedItem: PropTypes.object.isRequired,
  selectedCartItem: PropTypes.object,
  isEdit: PropTypes.bool,
};
export default SelectedItemModal;
