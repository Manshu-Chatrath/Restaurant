import { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { SUCCESS } from "../utils";
const DeleteModal = ({
  open,
  setOpen,
  status,
  selectedItem,
  onDelete,
  setSelectedItem,
}) => {
  useEffect(() => {
    if (status === SUCCESS) {
      setTimeout(() => {
        setSelectedItem(null);
      }, 200);
      setOpen(false);
    }
  }, [status]);

  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSelectedItem(null);
    }, 200);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove {selectedItem?.name} from the cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteModal.propTypes = {
  open: PropTypes.any.isRequired,
  setOpen: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default DeleteModal;
