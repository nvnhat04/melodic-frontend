import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import DenseTable from "../components/common/DenseTable";
import ArtistApi from "../api/modules/artist.api";
import { useSelector } from "react-redux";

const ArtistManageTracks = () => {
  const artist_id = useSelector((state) => state.auth.user_id);

  const header = [
    { id: "id", label: "ID" },
    { id: "title", label: "Title" },
    { id: "album_title", label: "Album" },
  ];

  const [tracks, setTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);

  const handleSelectRow = (index) => {
    const newSelectedRows = selectedTracks.includes(index)
      ? selectedTracks.filter((rowIndex) => rowIndex !== index) // Deselect if already selected
      : [...selectedTracks, index]; // Select if not selected
    setSelectedTracks(newSelectedRows);
  };

  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      setSelectedTracks(tracks.map((_, index) => index)); // Select all rows
    } else {
      setSelectedTracks([]); // Deselect all rows
    }
  };

  const handleDeleteRows = (rowsToDelete) => {
    const updatedTracks = tracks.filter(
      (_, rowIndex) => !rowsToDelete.includes(rowIndex)
    ); // Remove selected rows
    setTracks(updatedTracks);
    setSelectedTracks([]); // Clear selection after deletion
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
        onClick={() => handleDeleteRows(selectedTracks)} // Delete selected rows
        disabled={selectedTracks.length === 0} // Disable button if no rows are selected
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
    </Box>
  );
};

export default ArtistManageTracks;
