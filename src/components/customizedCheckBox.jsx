import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "@mui/material";
const CustomizedCheckBox = ({
  disabled,
  defaultChecked,
  handleClick,
  extra,
}) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (defaultChecked) {
      setChecked(true);
    }
  }, [defaultChecked]);

  const handleChange = (e) => {
    handleClick(e, extra);
    setChecked(e.target.checked);
  };

  return (
    <Checkbox
      checked={checked}
      onChange={(e) => handleChange(e)}
      disabled={disabled}
      sx={{
        "&.Mui-checked": {
          color: "black",
        },
      }}
    />
  );
};

CustomizedCheckBox.propTypes = {
  disabled: PropTypes.bool.isRequired,
  defaultChecked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  extra: PropTypes.any.isRequired,
};

export default CustomizedCheckBox;
