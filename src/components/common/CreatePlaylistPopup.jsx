import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';

const CreatePlaylistPopup = ({ open, onClose }) => {
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [description, setDescription] = useState('');
  //  const [showOnProfile, setShowOnProfile] = useState(false);

  const handleCreate = () => {
    // Handle the create action here
    console.log({
      playlistTitle,
      description,
      showOnProfile,
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#1E1E1E', // Dark background
          color: '#fff', // White text color
          padding: '20px',
          borderRadius: '8px',
            width: '20rem',
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        New Playlist
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Playlist Title"
          variant="outlined"
          fullWidth
          margin="dense"
          value={playlistTitle}
          onChange={(e) => setPlaylistTitle(e.target.value)}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#FF4B4B' }, // Red border color
              '&:hover fieldset': { borderColor: '#FF4B4B' }, // Red on hover
              '&.Mui-focused fieldset': { borderColor: '#FF4B4B' }, // Red on focus
            },
            '& .MuiInputLabel-root': { color: '#FF4B4B' },
          }}
        />
        <TextField
          label="Description (optional)"
          variant="outlined"
          fullWidth
          margin="dense"
          multiline
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#333' }, // Darker border color
              '&:hover fieldset': { borderColor: '#333' },
              '&.Mui-focused fieldset': { borderColor: '#333' },
            },
            '& .MuiInputLabel-root': { color: '#aaa' }, // Lighter label color
          }}
        />
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={showOnProfile}
              onChange={(e) => setShowOnProfile(e.target.checked)}
              sx={{ color: '#FF4B4B' }} // Checkbox color
            />
          }
          label="Show on My Profile and in Search"
          sx={{ color: '#aaa' }} // Label color
        /> */}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: '#fff',
            borderColor: '#333',
            '&:hover': { borderColor: '#555' },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          variant="contained"
          sx={{
            backgroundColor: '#FF4B4B',
            color: '#fff',
            '&:hover': { backgroundColor: '#E33E3E' },
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePlaylistPopup;