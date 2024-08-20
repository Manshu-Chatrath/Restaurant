import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { PENDING, SUCCESS, FAILED, IDLE } from "../utils/index";
import Loading from "../components/loader";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartItems,
  deleteCartItem,
  defaultOrderStatus,
  defaultCartListStatus,
  placingOrder,
  defaultDeleteCartStatus,
} from "../reducers/userSlice";
import CartFoodItemCard from "../components/cartFoodItemCard";
import HeadingImage from "../components/HeadingImage";
import cartImage from "../assets/cart.jpg";
import DeleteModal from "../components/deleteModal";
import Footer from "../components/footer";
const Cart = () => {
  const cartItems = useSelector((state) => state.user.cartListItems);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.cartListStatus);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const orderNumber = useSelector((state) => state.user.orderNumber);
  const [price, setPrice] = useState(0);
  const orderStatus = useSelector((state) => state.user.orderStatus);
  const [open, setOpen] = useState(false);
  const deleteItemStatus = useSelector(
    (state) => state.user.deleteCartItemStatus
  );

  useEffect(() => {
    if (orderStatus === SUCCESS || orderStatus === FAILED) {
      setLoading(false);
    }

    if (orderStatus === SUCCESS) {
      dispatch(defaultCartListStatus());
    }
  }, [orderStatus]);

  const [isOrderValid, setIsOrderValid] = useState(true);
  useEffect(() => {
    if (cartItems.length > 0) {
      let totalPrice = 0;
      cartItems.map((cartItem) => {
        totalPrice += +cartItem.price;
      });
      setPrice(totalPrice);
    } else {
      setPrice(0);
    }
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      dispatch(getCartItems({ id: user?.id }));
    }
  }, [user]);

  useEffect(() => {
    if (deleteItemStatus === SUCCESS) {
      dispatch(defaultDeleteCartStatus());
      dispatch(getCartItems({ id: user?.id }));
    }
  }, [deleteItemStatus]);

  const handleClick = () => {
    setLoading(true);
    setOpenModal(true);
    dispatch(placingOrder({ userId: user?.id, email: user?.email }));
  };

  const onDelete = () => {
    dispatch(deleteCartItem({ id: selectedItem.id, userId: user.id }));
  };

  const handleClose = () => {
    dispatch(defaultDeleteCartStatus());
    setOpen(false);
  };

  const Loader = () => {
    return (
      <Box style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Box>
          <CircularProgress style={{ color: "black" }} size={30} />
        </Box>
      </Box>
    );
  };

  const onClose = () => {
    dispatch(defaultOrderStatus());
    setOpenModal(false);
  };

  return (
    <>
      <HeadingImage image={cartImage} title="My Cart" activeNav="Cart" />
      <Box style={{ textAlign: "center", marginTop: 30 }}>
        <Typography variant="h4">Cart Items</Typography>
        {!isOrderValid && (
          <Typography sx={{ color: "red" }}>Remove inactive items!</Typography>
        )}
      </Box>
      <hr
        style={{
          color: "black",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          opacity: 0.4,
          height: "1px",
          width: "80%",
          marginTop: "1rem",
        }}
      />
      {status === PENDING ? (
        <Loader />
      ) : cartItems?.length === 0 || !cartItems?.length ? (
        <Box
          sx={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            padding: "40px",
          }}>
          {status === SUCCESS || status === IDLE
            ? "You have no items in the cart!"
            : status === FAILED
            ? "Some error has occured!"
            : null}
        </Box>
      ) : (
        <Grid
          container
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}>
          {cartItems.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <CartFoodItemCard
                  open={open}
                  setOpen={setOpen}
                  setSelectedItem={setSelectedItem}
                  isOrderValid={isOrderValid}
                  setIsOrderValid={setIsOrderValid}
                  item={item}
                />
              </React.Fragment>
            );
          })}
        </Grid>
      )}
      <hr
        style={{
          color: "black",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          opacity: 0.4,
          height: "1px",
          width: "80%",
          marginTop: "1rem",
        }}
      />
      <Box>
        <Typography
          sx={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
          Total Price: ${price}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "20px",
          justifyContent: "center",
        }}>
        <Box>
          <Button
            disabled={!isOrderValid}
            onClick={handleClick}
            sx={{
              width: "100%",
              backgroundColor: "black",
              marginTop: "10px",
              marginBottom: "20px",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
            variant="contained">
            Place Order
          </Button>
        </Box>
        <DeleteModal
          onDelete={onDelete}
          open={open}
          status={deleteItemStatus}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setOpen={setOpen}
        />
        <Snackbar
          onClose={handleClose}
          open={deleteItemStatus !== IDLE}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert
            severity={
              deleteItemStatus === PENDING
                ? "info"
                : deleteItemStatus === FAILED
                ? "error"
                : deleteItemStatus === SUCCESS
                ? "success"
                : ""
            }
            variant="filled"
            sx={{ width: "100%" }}>
            {deleteItemStatus === PENDING
              ? "Deleting the item....."
              : deleteItemStatus === FAILED
              ? "An error has occured!"
              : deleteItemStatus === SUCCESS
              ? "Item has been removed from the cart!"
              : null}
          </Alert>
        </Snackbar>
      </Box>
      <Loading
        orderNumber={orderNumber}
        loading={loading}
        onClose={onClose}
        open={openModal}
        isOrder={true}
        status={orderStatus}
      />
      <Footer />
    </>
  );
};
export default Cart;
