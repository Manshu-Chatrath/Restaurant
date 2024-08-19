import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";
import { SUCCESS, FAILED, IDLE } from "../utils";
const Loading = ({
  status = IDLE,
  loading = false,
  isOrder = false,
  open,
  orderNumber = null,
  onClose = () => null,
  errorMessage = "Some error occured!",
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    color: status === FAILED ? "red" : "black",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "25px",
    textAlign: "center",
    width: isOrder && orderNumber ? "30%" : status === FAILED ? 250 : 200,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  };
  return (
    <Modal
      open={isOrder ? open : loading}
      onClose={onClose}
      aria-labelledby="status-modal-title"
      aria-describedby="status-modal-description">
      <Box sx={style}>
        {loading ? (
          <CircularProgress style={{ color: "grey" }} />
        ) : (
          <>
            <Typography
              id="status-modal-title"
              style={{ fontWeight: "bold" }}
              variant="h6"
              component="h2">
              {status === SUCCESS
                ? isOrder
                  ? `Your order number is ${orderNumber} and you can go to restaurant to pick your order up in 30 minutes! You will receive an order number on your email! Please do show your order number at restaurant.`
                  : "Success!"
                : status === FAILED
                ? errorMessage
                : null}
            </Typography>
            <Button
              variant="contained"
              onClick={onClose}
              style={{
                backgroundColor: "#dc3545",
                width: "100%",
                marginTop: 10,
              }}>
              OK
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};
Loading.propTypes = {
  status: PropTypes.string,
  open: PropTypes.bool,
  loading: PropTypes.bool,
  onClose: PropTypes.func,
  isOrder: PropTypes.bool,
  orderNumber: PropTypes.number,
  errorMessage: PropTypes.string,
};
export default Loading;
