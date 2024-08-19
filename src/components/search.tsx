import React from "react";
import { Box, TextField } from "@mui/material";
import PropTypes from "prop-types";
const Search = ({ handleChange, placeholder }) => {
  const label = placeholder ? placeholder : "Search";
  return (
    <Box
      style={{
        width: "100%",
        justifyContent: "center",
        display: "flex",
        marginTop: "30px",
      }}>
      <Box style={{ width: "250px" }}>
        <TextField
          onChange={handleChange}
          id="standard-basic"
          label={label}
          variant="standard"
          style={{ width: "100%" }}
        />
      </Box>
    </Box>
  );
};
Search.prototype = {
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
export default Search;
