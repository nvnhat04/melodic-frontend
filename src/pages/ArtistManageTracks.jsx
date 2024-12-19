import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DenseTable from "../components/common/DenseTable";
import ArtistApi from "../api/modules/artist.api";
import TrackApi from "../api/modules/track.api";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ArtistManageTracks = () => {
  const artist_id = useSelector((state) => state.auth.user_id);

  const header = [
    { id: "id", label: "ID" },
    { id: "title", label: "Title" },
    { id: "album_title", label: "Album" },
  ];

  const [tracks, setTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSelectRow = (index) => {
    const newSelectedRows = selectedTracks.includes(index)
      ? selectedTracks.filter((rowIndex) => rowIndex !== index)
      : [...selectedTracks, index];
    setSelectedTracks(newSelectedRows);
  };

  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      setSelectedTracks(tracks.map((_, index) => index));
    } else {
      setSelectedTracks([]);
    }
  };

  const handleDeleteRows = async (rowsToDelete) => {
    const tracksToDelete = rowsToDelete.map((index) => tracks[index]);
    try {
      for (const track of tracksToDelete) {
        await TrackApi.deleteTrackById(track.id);
      }
      const updatedTracks = tracks.filter(
        (_, rowIndex) => !rowsToDelete.includes(rowIndex)
      );
      setTracks(updatedTracks);
      setSelectedTracks([]);

      toast.success("Tracks deleted successfully!");
    } catch (error) {
      console.error("Error deleting tracks:", error);
      toast.error("Failed to delete tracks.");
    }
    setIsDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const fetchArtistTracks = async () => {
      try {
        const data = await ArtistApi.getAllTracks(artist_id);
        console.log(data);
        const filteredData = data.map((track) => ({
          id: track.track_id,
          title: track.track_title,
          album_title: track.album_title,
        }));
        console.log("filtered: ", filteredData);
        setTracks(filteredData);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch tracks.");
      }
    };
    fetchArtistTracks();
  }, [artist_id]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <h1>Artist Tracks</h1>
      <Button
        variant="contained"
        color="error"
        onClick={handleOpenDialog}
        disabled={selectedTracks.length === 0}
        sx={{ alignSelf: "flex-end" }}
      >
        Delete Selected
      </Button>

      <DenseTable
        header={header}
        rows={tracks}
        selectedTracks={selectedTracks}
        onSelectRow={handleSelectRow}
        onSelectAllRows={handleSelectAllRows}
      />

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the selected tracks? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteRows(selectedTracks)}
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

export default ArtistManageTracks;
