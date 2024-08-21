import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getItems,
  defaultItemListStatus,
  defaultSelectedItemStatus,
  defaultCategoriesListStatus,
} from "../reducers/itemsSlice";
import FoodItemCard from "../components/foodItemCard";
import HeadingImage from "../components/HeadingImage";
import VisibilitySensor from "react-visibility-sensor";
import { PENDING, FAILED, SUCCESS } from "../utils/index";
import { defaultCartStatus } from "../reducers/userSlice";
import {
  Box,
  CircularProgress,
  Button,
  Alert,
  Grid,
  Typography,
  Snackbar,
} from "@mui/material";
import menuImage from "../assets/menu.jpg";
import Footer from "../components/footer";
import Search from "../components/search";
import Loading from "../components/loader";
import HorizontalScroll from "../components/horizontalScroll";
import { useNavigate } from "react-router-dom";
const Menu = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.itemsList);
  const categories = useSelector((state) => state.items.categoriesList);
  const visibilitySensorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const categoryStatus = useSelector(
    (state) => state.items.categoriesListStatus
  );
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const selectedItemStatus = useSelector(
    (state) => state.items.selectedItemStatuss
  );

  const itemsListStatus = useSelector((state) => state.items.itemsListStatus);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemList, setItemList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const totalItems = useSelector((state) => state.items.totalItems);
  const count = 10;
  const [categoryId, setCategoryId] = useState(null);
  const cartStatus = useSelector((state) => state.user.cartStatus);
  const [page, setPage] = useState(0);
  const handleClick = () => navigate("/cart");
  const cartLength = useSelector((user) => user.user.cartLength);
  useEffect(() => {
    if (itemList.length < totalItems) {
      const arr = [...itemList, ...items];
      setItemList([...arr]);
    }
  }, [items, totalItems]);

  useEffect(() => {
    dispatch(
      getItems({
        page: 0,
        search: searchTerm,
        count: count,
        categoryId: categoryId,
      })
    );
    dispatch(getCategories());

    return () => {
      setItemList([]);
      dispatch(defaultItemListStatus());
      dispatch(defaultSelectedItemStatus());
      dispatch(defaultCategoriesListStatus());
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
    dispatch(defaultCartStatus());
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

  const onChange = (visible) => {
    if (visible) {
      let newPage = page + 1;
      dispatch(
        getItems({
          page: newPage * 10,
          count: 10,
          categoryId: categoryId,
          search: searchTerm,
        })
      );
      setPage(newPage);
    }
  };

  const handleChange = (e) => {
    setTimeout(() => {
      setItemList([]);
      setSearchTerm(e.target.value);
      setPage(0);
      dispatch(
        getItems({
          page: 0,
          search: e.target.value,
          count: count,
          categoryId: categoryId,
        })
      );
    }, 300);
  };
  const onClick = (id) => {
    setItemList([]);
    setCategoryId(id);
    setPage(0);
    dispatch(
      getItems({
        page: 0,
        search: searchTerm,
        count: count,
        categoryId: id,
      })
    );
  };

  useEffect(() => {
    if (
      cartStatus === PENDING ||
      cartStatus === SUCCESS ||
      cartStatus === FAILED
    ) {
      setOpen(true);
    }
  }, [cartStatus]);

  return (
    <>
      <Loading status={selectedItemStatus} />
      <HeadingImage image={menuImage} title="Menu" activeNav="Menu" />
      <Box style={{ minHeight: "50vh" }}>
        {categoryStatus === PENDING ? (
          <Loader />
        ) : categoryStatus === FAILED ? (
          <Box style={{ textAlign: "center", fontWeight: "bold" }}>
            Some error has occured please try again!
          </Box>
        ) : categoryStatus === SUCCESS && categories.length === 0 ? (
          <Box
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Typography variant="h4">
              Please create categories first!
            </Typography>
          </Box>
        ) : (
          categoryStatus === SUCCESS &&
          categories.length > 0 && (
            <>
              <Search
                placeholder={"Search any dish"}
                handleChange={handleChange}
              />
              <hr
                style={{
                  color: "black",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  opacity: 0.4,
                  height: "1px",
                  width: "100%",
                  marginTop: 30,
                }}
              />
              <HorizontalScroll
                setSelectedItem={setSelectedCategory}
                selectedItem={selectedCategory}
                onClick={onClick}
                rows={categories}
              />
              <Box style={{ textAlign: "center", marginTop: 30 }}>
                <Typography variant="h4">
                  {categoryId
                    ? capitalizeFirstLetter(selectedCategory?.name)
                    : "All Items"}
                </Typography>
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
              <Box
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: "24px",
                }}>
                {itemsListStatus === PENDING && itemList.length === 0 ? (
                  <Loader />
                ) : itemsListStatus === FAILED ? (
                  "Some error has occured please try again!"
                ) : searchTerm && itemList.length === 0 ? (
                  "No dishes found under this category."
                ) : itemsListStatus === SUCCESS && itemList.length === 0 ? (
                  "Please Add Dishes."
                ) : null}
              </Box>
              <Grid
                container
                sx={{
                  width: "80%",
                  margin: "0 auto",
                }}>
                {itemList.map((item) => (
                  <Grid
                    style={{
                      marginBottom: "30px",
                      opacity: item?.isActive ? 1 : 0.5,
                    }}
                    xs={12}
                    md={4}
                    lg={3}
                    key={item.id}
                    item>
                    <FoodItemCard dish={item} />
                  </Grid>
                ))}
                {itemList.length < totalItems && itemList.length > 9 && (
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <VisibilitySensor
                        ref={visibilitySensorRef}
                        onChange={onChange}>
                        <CircularProgress
                          style={{ color: "black" }}
                          size={25}
                        />
                      </VisibilitySensor>
                    </div>
                  </Box>
                )}
              </Grid>
            </>
          )
        )}
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={4000}
          onClose={handleClose}>
          <Alert
            severity={
              cartStatus === PENDING
                ? "info"
                : cartStatus === FAILED
                ? "error"
                : cartStatus === SUCCESS
                ? "success"
                : ""
            }
            variant="filled"
            sx={{ width: "100%" }}>
            {cartStatus === PENDING
              ? "Adding item to cart...."
              : cartStatus === FAILED
              ? "An error has occured!"
              : cartStatus === SUCCESS
              ? "Item has been added to the cart!"
              : null}
          </Alert>
        </Snackbar>
        {cartLength > 0 && (
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Button
              onClick={handleClick}
              sx={{
                width: "90%",
                padding: "10px",
                color: "white",
                background: "black",
                marginBottom: "20px",
              }}
              variant="contained">
              View Cart ({cartLength} {cartLength > 1 ? "items" : "item"})
            </Button>
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
};
export default Menu;
