import { useState, useMemo, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Loading from "./loader";
import CardMedia from "@mui/material/CardMedia";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import moment from "moment-timezone";
import { getItem } from "../reducers/itemsSlice";
import SelectedItemModal from "./selectedItemModal";
import { Button, CardActionArea, Box } from "@mui/material";
import PropTypes from "prop-types";
import { SUCCESS } from "../utils";
const FoodItemCard = ({ dish }) => {
  const [isHover, setHover] = useState(false);
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.items.selectedItem);
  const [reRender, setReRender] = useState(false);
  const selectedItemStatus = useSelector(
    (state) => state.items.selectedItemStatus
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (selectedItem?.id === dish?.id) {
      setReRender(true);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (selectedItemStatus === SUCCESS) {
      setLoading(false);
    }
  }, [selectedItemStatus]);

  const calculateDiscount = () => {
    return dish.price - (dish.price * dish.discount) / 100;
  };

  const handleClick = () => {
    if (dish?.isActive) {
      setLoading(true);
      dispatch(getItem({ id: dish.id }));
    }
  };

  const onClose = () => {
    setLoading(false);
  };

  const memoizedCard = useMemo(() => {
    return (
      <>
        <Card
          onClick={handleClick}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{
            position: "relative",
            boxShadow: "3px 3px 5px 6px #ccc",
            borderRadius: "20px",
            marginLeft: "5%",
            opacity: dish?.isActive ? 1 : 0.5,
            marginRight: "5%",
            width: "90%",
          }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={dish.src}
              alt="green iguana"
            />
            <CardContent>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box>
                  <Typography style={{ fontWeight: "bold", fontSize: "16px" }}>
                    {dish.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}>
                    {moment.utc().valueOf() >= dish?.discountStartTime &&
                    moment.utc().valueOf() < dish?.discountEndTime &&
                    dish?.discount ? (
                      <>
                        <span>{"$" + calculateDiscount()}</span>
                        <span
                          style={{
                            marginLeft: "10px",
                            color: "red",
                            textDecoration: "line-through",
                          }}>
                          {"$" + dish.price}
                        </span>
                      </>
                    ) : (
                      "$" + dish.price
                    )}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
          {isHover && ( // Conditionally render this Box based on hover state
            <Box
              // Add onClick handler
              sx={{
                position: "absolute",
                cursor: "pointer",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.55)",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0, // Initially hidden
                transition: "opacity 0.5s ease",
                "&:hover": {
                  opacity: 1, // Show on hover
                },
              }}>
              <Button
                variant="text"
                disableRipple
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "transparent", // Override hover background color
                  },
                }}>
                Quick View
              </Button>
            </Box>
          )}
        </Card>
      </>
    );
  }, [reRender, isHover]);

  return (
    <>
      {selectedItem?.id === dish?.id && (
        <SelectedItemModal selectedItem={selectedItem} />
      )}
      <Loading
        loading={loading}
        onClose={onClose}
        status={selectedItemStatus}
      />
      {memoizedCard}
    </>
  );
};
FoodItemCard.propTypes = {
  dish: PropTypes.object.isRequired,
};
export default FoodItemCard;
