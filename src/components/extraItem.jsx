import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import CustomizedCheckBox from "./customizedCheckBox";
import PropTypes from "prop-types";
import React from "react";
const ExtraItem = ({ item, setExtras, extras, price, setPrice }) => {
  const [extraItems, setExtraItems] = useState([]);

  const handleClick = (e, extraItem) => {
    let arr = [...extraItems];
    let totalPrice = +price; // + is added to convert string to number
    if (e.target.checked) {
      arr.push(extraItem.id);
      totalPrice += extraItem.price;
    } else {
      arr = arr.filter((extra) => extra !== extraItem.id);
      totalPrice -= extraItem.price;
    }
    setPrice(totalPrice);
    setExtraItems([...arr]);
    if (extras.length === 0 && arr.length > 0) {
      setExtras([{ id: item.id, extraItems: arr }]);
      return;
    }
    let newArr = [...extras];
    if (arr.length === 0) {
      newArr = newArr.filter((extra) => extra.id !== item.id);
      setExtras([...newArr]);
    } else {
      const isExtraExist = newArr.find((extra) => extra.id === item.id);
      if (!isExtraExist) {
        newArr.push({ id: item.id, extraItems: arr });
      } else {
        const index = newArr.findIndex((extra) => extra.id === item.id);
        newArr[index].extraItems = { id: item.id, extraItems: arr };
      }
      setExtras([...newArr]);
    }
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
        }}>
        <Box style={{ padding: "20px 0" }}>
          <Typography
            style={{ textAlign: "left", fontSize: "20px", fontWeight: "bold" }}>
            {item.name}
          </Typography>
        </Box>
        <Box>
          <Button
            sx={{
              fontSize: "11px",
              borderRadius: "20px",
              fontWeight: "bold",
              backgroundColor: "black",
            }}
            variant="contained">
            allowed ({item.allowedItems})
          </Button>
        </Box>
      </Box>
      {item.extras.map((extra, index) => {
        let selectedItems;

        selectedItems = extras?.find((e) => e.id === extra.extraId)?.extraItems;
        console.log(selectedItems);
        let isSelected = false;
        if (selectedItems?.length > 0) {
          isSelected = selectedItems?.includes(extra.id);
        }
        return (
          <React.Fragment key={index}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 0",
              }}>
              <Box>
                <Typography style={{ fontSize: "16px", fontWeight: "bold" }}>
                  {extra.name}
                </Typography>
                <Typography
                  style={{
                    fontSize: "16px",
                    marginLeft: "5px",
                    textAlign: "left",
                  }}>
                  + ${extra.price}
                </Typography>
              </Box>
              <Box>
                <CustomizedCheckBox
                  disabled={
                    (extraItems.length >= item.allowedItems ||
                      selectedItems.length >= item.allowedItems) &&
                    !extraItems.includes(extra.id)
                  }
                  extra={extra}
                  handleClick={handleClick}
                  defaultChecked={isSelected}
                />
              </Box>
            </Box>
          </React.Fragment>
        );
      })}
    </>
  );
};
ExtraItem.propTypes = {
  price: PropTypes.number.isRequired || PropTypes.string.isRequired,
  setPrice: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  extras: PropTypes.any.isRequired,
  setExtras: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default ExtraItem;
