import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Chip
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import artistApi from '../../api/modules/artist.api';
import { useSelector } from 'react-redux';

const AddNewAlbum = () => {
  const user_id = useSelector((state) => state.auth.user_id);
  const [fileError, setFileError] = useState('');
  const initialFormData = {   
    title: '',
    release_date: null,
    description: '',
    file: null,
    album_type: '',
  }
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Handle file change
   const handleFileChange = (e) => {
      const file = e.target.files[0];
      if(file ) {
        setFormData({ ...formData, file });
        setFileError('');
      } else {
        console.log('Invalid file');
        setFormData({ ...formData, file: null });
        setFileError('Please upload a valid image file (JPEG or PNG).');
      }
    };
   // Handle date change
   const handleDateChange = (newDate) => {
    setFormData({ ...formData, release_date: newDate });
  };

    const handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData();
  
      data.append('title', formData.title);
      data.append('release_date', formData.release_date);
      data.append('description', formData.description);
      if (formData.file) {
        data.append('cover', formData.file);
      } else {
        data.append('cover', null);
      }
      data.append('album_type', formData.album_type);
      data.append('artist_id', user_id);
  
      // Log FormData entries
      for (let [key, value] of data.entries()) {
          console.log(key, value);
      }
  
      artistApi.addAlbum(data).then((response) => {  
        console.log(response.result);
        if(response.success){
          setFormData(initialFormData);
          alert('Track added successfully');
        }
        else {
          alert('Failed to add album');
        }
      }).catch((error) => {
        console.error('Error:', error);
        alert('Failed to add album');
      });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx ={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}>

      
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          margin: 'auto',
          padding: 2,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color:  '#e75565', fontWeight: 'bold' }}>
          Add new Album
        </Typography>
        <TextField
          label="Title"
          name="title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
     
        <DatePicker
          label="Release Date"
          value={formData.release_date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField fullWidth {...params} sx={{ mb: 2 }} />}
        />
        <TextField 
        label="Description"
        name="description"
        fullWidth
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        sx={{ mb: 2 }}
        />
        <Button variant="contained" component="label"  sx={{ mb: 2, backgroundColor: '#e75565' }}>
          Upload File
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {fileError && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {fileError}
          </Typography>
        )}
        {formData.file && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            File: {formData.file.name}
          </Typography>
        )}
        <TextField
          label="Album Type"
          name="album_type"
          fullWidth
          select
          value={formData.album_type}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        >
          {['Album','Single'].map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx ={{ mb: 2, backgroundColor: '#e75565' }}
        >
          Submit
        </Button>
      </Box>
      {/*  Preview */}
      {/* <Box sx={{ ml: 20 }}>
        preview
      </Box> */}

      </Box>
    </LocalizationProvider>
  );
};

export default AddNewAlbum;
