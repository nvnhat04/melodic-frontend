import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import MerchandiseApi from "../../api/modules/merchandise.api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MerchandiseItem = ({ merchandise, onDelete }) => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleModifyButtonClick = () => {
    navigate(`/artist/update-merchandise/${merchandise.id}`);
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
