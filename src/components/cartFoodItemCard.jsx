import {
  Grid,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const CartFoodItemCard = ({
  item,
  setIsOrderValid,
  setOpen,
  isOrderValid,
  setSelectedItem,
}) => {
  const smallScreen = useMediaQuery("(max-width:500px)");
  const printExtraItems = () => {
    const extraItems = item.extraItems;
    let str = ``;
    extraItems.map((i) => {
      str += `${i.name}: ${i.items.map((c) => c.name + " | ")}`;
    });
    return <Typography sx={{ marginLeft: "10px" }}>Extras: {str}</Typography>;
  };

  if (!item?.isActive && isOrderValid) {
    setIsOrderValid(false);
  }

  if (item?.disable && isOrderValid) {
    setIsOrderValid(false);
  }
  const onClick = () => {
    setSelectedItem(item);
    setOpen(true);
  };

  return (
    <Grid xs={12} md={4} item container>
      <Box
        sx={{
          display: "flex",
          boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          marginBottom: "30px",
          borderRadius: "5px",
          width: "100%",
          position: "relative",
          opacity: item?.isActive ? 1 : 0.5,
          padding: "10px",
        }}>
        {" "}
        <IconButton
          aria-label="close"
          onClick={onClick}
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
        <Box>
          <img
            style={{
              width: "100px",
            }}
            src={item.src}
          />
        </Box>
        <Box>
          {item?.disable && (
            <Typography
              sx={{ color: "red", fontWeight: "bold", marginLeft: "10px" }}>
              Readd or remove this item
            </Typography>
          )}

          <Typography
            sx={{
              marginLeft: "10px",
              fontWeight: "bold",
              fontSize: smallScreen ? "18px" : "20px",
            }}>
            Title: {item.name}
          </Typography>
          <Typography sx={{ marginLeft: "10px" }}>
            Quantity: {item.quantity}
          </Typography>
          <Typography sx={{ marginLeft: "10px" }}>
            Price: ${item.price}
          </Typography>
          {item?.extraItems?.length > 0 ? printExtraItems() : null}
        </Box>
      </Box>
    </Grid>
  );
};
CartFoodItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  setIsOrderValid: PropTypes.func.isRequired,
  isOrderValid: PropTypes.func.isRequired,
};
export default CartFoodItemCard;
