import React, { useEffect, useState } from "react";
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
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import detectDuration from "../../hooks/DetectDuration";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import trackApi from "../../api/modules/track.api";
import artistApi from "../../api/modules/artist.api";
import { useNavigate } from "react-router-dom";
import { use } from "react";

const UpdateTrack = () => {
  const track_id = useParams().id;
  const user_id = useSelector((state) => state.auth.user_id);
  const [albumList, setAlbumList] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [albumExists, setAlbumExists] = useState(false);
  const [parsedDuration, setParsedDuration] = useState("");
  const [durationError, setDurationError] = useState("");
  const [fileError, setFileError] = useState("");
  const [initialFormData, setInitialFormData] = useState({
    track_id: "",
    title: "",
    lyrics: "",
    release_date: null,
    duration: "",
    language: "",
    genre: [],
    album: "",
    collaborators: [{ name: "", profitShare: "" }],
    file: null,
  });
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const parseDuration = (input) => {
    const regex = /^(\d+)m\s*(\d*)s?$/;
    const match = input.match(regex);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = match[2] ? parseInt(match[2], 10) : 0;
      const totalSeconds = minutes * 60 + seconds;
      setParsedDuration(totalSeconds);
      setDurationError("");
    } else {
      setParsedDuration("");
      setDurationError(
        'Invalid duration format. Please use the format "Xm Ys".'
      );
    }
  };
  const formatDuration = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m${seconds}s`;
  };
  const fetchAlbums = async () => {
    try {
      const response = await artistApi.getAllAlbums(user_id);
      // console.log(response);
      if (response && response.length > 0) {
        setAlbumList(response);
      } else {
        alert("Failed to fetch albums");
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
      alert("Failed to fetch albums");
    }
  };
//   const fetchInitialTrack = async () => {
//     console.log("Fetching track:", track_id);
//     try {
//       const response = await trackApi.getTrackById(track_id);
//       console.log(response);
//       if (response) {
//         setInitialFormData(response);
//       } else {
//         alert("Failed to fetch track");
//       }
//     } catch (error) {
//       console.error("Error fetching track:", error);
//       alert("Failed to fetch track");
//     }
//   };
const fetchInitialTrack = async () => {
    try {
      const trackData = await trackApi.getTrackById(track_id);
      setFormData({
        track_id: trackData.id,
        title: trackData.title,
        lyrics: trackData.lyrics,
        release_date: trackData.release_date ? dayjs(trackData.release_date) : null,
        duration: trackData.duration ? formatDuration(trackData.duration) : '',
        language: trackData.language,
        artist_role: trackData.artist_role,
        genre: trackData.genres,
        album: trackData.album[0].album_title,
        collaborators: [{ name: '', profitShare: '' }],
        file: null,
      });
    //   console.log('Track data:', trackData);
    } catch (error) {
      console.error('Error fetching track data:', error);
    }
  };





  useEffect(() => {
    fetchAlbums();
  }, []);

  useEffect(() => {
    const exists = albumList.some((album) => {
      if (
        formData.album &&
        album.title.toLowerCase() === formData.album.toLowerCase() &&
        album.artist_id === user_id &&
        album.album_type === "album"
      ) {
        setAlbumExists(true);
        setAlbumData(album);
        return true;
      }
      return false;
    });
  }, [albumList, formData.album, user_id]);
  useEffect(() => {
    fetchInitialTrack();
  }, []);
//   useEffect(() => {
//     console.log("Initial form data:", initialFormData);
//     setFormData(initialFormData);
//     }, [initialFormData]);
  useEffect(() => {
    console.log("Updated Albums:", albumList);
  }, [albumList, formData.album, user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

    if (!albumExists) {
      // If album doesn't exist, ask user if they want to create a new album
      const createNewAlbum = window.confirm(
        "This album does not exist. Would you like to create a new album?"
      );
      if (createNewAlbum) {
        navigate("/artist/add-album"); // Navigate to the "Add Album" page
        return;
      } else {
        alert("Please select an existing album or create a new one.");
        return;
      }
    } else {
      console.log("Album data:", albumData);
    }

    const data = new FormData();
    // const user_id = decodeToken(token).id;
    data.append("track_id", formData.track_id);
    data.append("title", formData.title);
    data.append("lyrics", formData.lyrics);
    data.append("release_date", formData.release_date);
    data.append("duration", parsedDuration);
    data.append("language", formData.language);
    data.append("user_id", user_id);
    formData.genre.forEach((genre, index) => {
      data.append(`genre[${index}]`, genre);
    });
    console.log("Album data:", albumData.id);
    data.append("album", albumData.id);
    // data.append("collaborator", JSON.stringify(formData.collaborators)); // Convert to JSON string
  
    // console.log('FormData content:');
    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    trackApi.updateTrack(data).then((response) => {
      console.log(response);
      if (response.success) {
        setFormData(initialFormData);
        alert("Track added successfully");
      } else {
        alert("Failed to add track");
      }
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 600,
            margin: "auto",
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "center", color: "#e75565", fontWeight: "bold" }}
          >
            UpdateTrack
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

          <TextField
            label="Album"
            name="album"
            fullWidth
            value={formData.album}
            // onBlur={handleExistingAlbum} // Xử lý khi mất focus
            // onKeyDown={(e) => e.key === 'Enter' && handleExistingAlbum(e)} // Xử lý khi nhấn Enter
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <DatePicker
            label="Release Date"
            value={formData.release_date}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField fullWidth {...params} sx={{ mb: 2 }} />
            )}
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
            {[
              "Vietnamese",
              "English",
              "Spanish",
              "French",
              "German",
              "Other",
            ].map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
          </TextField>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel required>Genres</InputLabel>
            <Select
              label="Genres"
              name="genre"
              multiple
              value={formData.genre}
              onChange={handleChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {[
                "Pop",
                "Hip Hop",
                "Ballad",
                "Rock",
                "Jazz",
                "K-pop",
                "R&B",
                "Country",
                "Sad",
                "Indie",
                "Chill",
                "Other",
              ].map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <Box sx={{ mb: 2 }}>
            {formData.collaborators.map((collaborator, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <TextField
                  label={`Collaborator ${index + 1} (Username)`}
                  name="name"
                  fullWidth
                  value={collaborator.name}
                  onChange={(event) => handleChangeCollab(index, event)}
                  sx={{ mb: 2, width: "70%" }}
                />
                <TextField
                  label="% Profit"
                  name="profitShare"
                  // type="number"
                  value={collaborator.profitShare}
                  onChange={(event) => handleChangeCollab(index, event)}
                  // required
                  sx={{ mb: 2, width: "30%" }}
                />
                <Button onClick={() => removeCollaborator(index)}>
                  <DeleteIcon />
                </Button>
              </div>
            ))}
            <Button onClick={addCollaborator}>Add Collaborator</Button>
          </Box> */}


          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2, backgroundColor: "#e75565" }}
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

export default UpdateTrack;
