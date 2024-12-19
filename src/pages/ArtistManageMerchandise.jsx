import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DenseTable from "../components/common/DenseTable";
import MerchandiseApi from "../api/modules/merchandise.api";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ArtistManageMerchandise = () => {
  const user_id = useSelector((state) => state.auth.user_id);
  const token = useSelector((state) => state.auth.token);
  const [merchandiseList, setMerchandiseList] = useState([]);
  const [selectedMerchandise, setSelectedMerchandise] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const header = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "price", label: "Price" },
    { id: "stock", label: "Stock" },
    { id: "total_sold", label: "Total Sold" },
  ];

  const handleSelectRow = (index) => {
    const newSelectedRows = selectedMerchandise.includes(index)
      ? selectedMerchandise.filter((rowIndex) => rowIndex !== index)
      : [...selectedMerchandise, index];
    setSelectedMerchandise(newSelectedRows);
  };

  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      setSelectedMerchandise(merchandiseList.map((_, index) => index));
    } else {
      setSelectedMerchandise([]);
    }
  };

  const handleDeleteRows = async (rowsToDelete) => {
    const merchandiseToDelete = rowsToDelete.map(
      (index) => merchandiseList[index]
    );
    try {
      for (const merchandise of merchandiseToDelete) {
        await MerchandiseApi.deleteMerchandise(merchandise.id, token);
      }
      const updatedMerchandiseList = merchandiseList.filter(
        (_, rowIndex) => !rowsToDelete.includes(rowIndex)
      );
      setMerchandiseList(updatedMerchandiseList);
      setSelectedMerchandise([]);

      toast.success("Merchandise deleted successfully!");
    } catch (error) {
      console.error("Error deleting merchandise:", error);
      toast.error("Failed to delete merchandise.");
    }
    setIsDialogOpen(false);
  };

  const navigate = useNavigate();
  const handleModifyRow = (row) => {
    navigate(`/artist/update-merchandise/${row.id}`); 
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const fetchMerchandiseList = async () => {
      try {
        const response = await MerchandiseApi.getAllMerchandiseByArtistId(
          user_id
        );
        setMerchandiseList(response || []);
      } catch (error) {
        console.error("Error fetching merchandise:", error);
        toast.error("Failed to fetch merchandise.");
      }
    };
    fetchMerchandiseList();
  }, [user_id]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <h1>Artist Merchandise</h1>
      <Button
        variant="contained"
        color="error"
        onClick={handleOpenDialog}
        disabled={selectedMerchandise.length === 0}
        sx={{ alignSelf: "flex-end" }}
      >
        Delete Selected
      </Button>

      <DenseTable
        header={header}
        rows={merchandiseList}
        selectedTracks={selectedMerchandise}
        onSelectRow={handleSelectRow}
        onSelectAllRows={handleSelectAllRows}
        modifiable={true}
        onModifyRow={handleModifyRow}
      />

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the selected merchandise? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteRows(selectedMerchandise)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default ArtistManageMerchandise;
