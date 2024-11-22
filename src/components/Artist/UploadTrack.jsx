import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  Typography,
  duration,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import trackApi from '../../api/modules/track.api';

const UploadTrack = () => {
  const [parsedDuration, setParsedDuration] = useState('');
  const [durationError, setDurationError] = useState('');
  const [fileError, setFileError] = useState('');
  const parseDuration = (input) => {
    const regex = /^(\d+)m\s*(\d*)s?$/;
    const match = input.match(regex);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = match[2] ? parseInt(match[2], 10) : 0;
      const totalSeconds = minutes * 60 + seconds;
      setParsedDuration(totalSeconds);
      setDurationError('');
    } else {
      setParsedDuration('');
      setDurationError('Invalid duration format. Please use the format "Xm Ys".');
    }
  };
 
  const [formData, setFormData] = useState({
    title: '',
    lyrics: '',
    release_date: null,
    duration: '',
    language: '',
    artist_role: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'audio/mpeg') {
      setFormData({ ...formData, file });
      setFileError('');
    } else {
      setFormData({ ...formData, file: null });
      setFileError('Please upload a valid MP3 file.');
    }
  };;
  // Handle date change
  const handleDateChange = (newDate) => {
    setFormData({ ...formData, release_date: newDate });
  };
  // Handle duration change
  const handleDurationChange = (event) => {
    const { value } = event.target;
    handleChange(event); 
    parseDuration(value); 
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('lyrics', formData.lyrics);
    data.append('release_date', formData.release_date);
    data.append('duration', parsedDuration);
    data.append('language', formData.language);
    data.append('user_id', 8);
    data.append('artist_role', 'original artist');
    if (formData.file) {
      
      data.append('file', formData.file);
    }

    // console.log('FormData content:');
    // for (let pair of data.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    trackApi.addTrack(data).then((response) => {  
      console.log(response.result);
      if(response.success){

        alert('Track added successfully');
      }
      else {
        alert('Failed to add track');
      }
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx ={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: 'auto',
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
          Upload Track
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
        <TextField
          label="Lyrics"
          name="lyrics"
          fullWidth
          multiline
          rows={4}
          value={formData.lyrics}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <DatePicker
          label="Release Date"
          value={formData.release_date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField fullWidth {...params} sx={{ mb: 2 }} />}
        />
       <TextField
          label="Duration (e.g., 2m 40s)"
          name="duration"
          fullWidth
          value={formData.duration}
          onChange={handleDurationChange}
          required
          sx={{ mb: 2, mt: 2 }}
          error={!!durationError}
          helperText={durationError}
        />
        <TextField
          label="Language"
          name="language"
          fullWidth
          select
          value={formData.language}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        >
          {['Vietnamese','English', 'Spanish', 'French', 'German', 'Other'].map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Artist Role"
          name="artist_role"
          fullWidth
          select
          value={formData.artist_role}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        >
          {['original artist', 'feature'].map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
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
      <Box sx={{ ml: 20 }}>
        preview
      </Box>

      </Box>
    </LocalizationProvider>
  );
};

export default UploadTrack;
