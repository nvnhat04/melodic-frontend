import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ClearIcon from "@mui/icons-material/Clear";
import MerchandiseApi from "../../api/modules/merchandise.api";
import { useSelector } from "react-redux";

const MerchandiseItem = ({ merchandise, onDelete }) => {
  const token = useSelector((state) => state.auth.token);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleModifyButtonClick = () => {
    // TODO: Implement modify button click
  };

  const handleDeleteButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await MerchandiseApi.deleteMerchandise(
        merchandise.id,
        token
      );

      if (response.message === "Merchandise deleted successfully") {
        alert("Merchandise deleted successfully");
        setIsDialogOpen(false);
        onDelete(merchandise.id);
      } else {
        console.warn("Unexpected response status:", response.status);
        alert(`Delete failed: ${response || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during delete operation:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          padding: "0.5rem",
          backgroundColor: "lightgray",
          display: "flex",
          borderRadius: "0",
          borderBottom: "1px solid #ffffff",
          alignItems: "center",
        }}
      >
        <Typography fontWeight="bold" flexBasis="40rem">
          {merchandise.name}
        </Typography>
        <Box display="flex" flexGrow={1} textAlign="center">
          <Typography width="5rem">${merchandise.price}</Typography>
          <Typography width="5rem">{merchandise.stock}</Typography>
          <Typography width="5rem">{merchandise.total_sold}</Typography>
        </Box>
        <Box display="flex" flexGrow={1} justifyContent="flex-end">
          <Button onClick={handleModifyButtonClick}>
            <EditNoteIcon />
          </Button>
          <Button onClick={handleDeleteButtonClick}>
            <ClearIcon sx={{ color: "red" }} />
          </Button>
        </Box>
      </Paper>

      {/* Alert Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{merchandise.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MerchandiseItem;
