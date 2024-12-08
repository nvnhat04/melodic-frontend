import { useState, useEffect } from "react";

import { Typography, Box, Modal, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import trackApi from "../../api/modules/track.api";
import createUrl from "../../hooks/createUrl";
const mockTracksData = [
  {
    id: 1,
    title: "Wildflower",
    image:
      "https://upload.wikimedia.org/wikipedia/en/6/68/John_Coltrane_-_Blue_Train.jpg",
    artist: "Billie Eilish",
  },
  {
    id: 2,
    title: "APT",
    image:
      "https://upload.wikimedia.org/wikipedia/en/5/52/Ros%C3%A9_and_Bruno_Mars_-_Apt..png",
    artist: "ROSÉ & Bruno Mars",
  },
  {
    id: 3,
    title: "Fein",
    image:
      "https://upload.wikimedia.org/wikipedia/en/c/c2/Travis_Scott_and_Chase_B_-_Fe%21n_%28Chase_B_remix%29.png",
    artist: "Travis Scott",
  },
  {
    id: 4,
    title: "Trí trá",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5fw24xh7c-YIPKPch7zXsG9kSPgkcfJFqJQ&s",
    artist: "Wrxdie",
  },
];

function ManageRequest() {
  const [tracksData, setTracksData] = useState([]);
  const [showFullId, setShowFullId] = useState(false);
  const [open, setOpen] = useState(false);
  const [trackCover, setTrackCover] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleIdClick = () => {
    setShowFullId(!showFullId);
  };
  const fetchTracks = async () => {
    try {
        const res = await trackApi.getAllTracksDisabled();
        if (res && res.length > 0) {
            setTracksData(res);
            //console.log("Tracks found:", res);
        } else {
            console.error("No tracks found");
        }
    } catch (error) {
        console.error("API call failed:", error);
    }
};
  const handleEnable = (id) => {
    trackApi
      .enableTrack(id)
      .then((res) => {
        if (res.status === 200) {
          // console.log("Track enabled:", res);
          // alert(res.data.message + " 01");
            fetchTracks();
        } else {
          console.error("Failed to enable track");
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  };
  const handleDisable = (id) => {
    trackApi
      .disableTrack(id)
      .then((res) => {
        if (res) {
          console.log("Track disabled:", res);
            fetchTracks();
        } else {
          console.error("Failed to disable track");
        }
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  };

useEffect(() => {
    fetchTracks();
    console.log("Tracks data:", tracksData);
    // console.log(tracksData[0]);
}, []);
useEffect(() => {
  if (tracksData.length > 0) {
      // console.log(createUrl(tracksData[0].cover));
      setTrackCover(createUrl(tracksData[0].cover));
  }
}, [tracksData]);

  return (
    <>
      <Typography variant="h5" sx={{ fontSize: 36, fontWeight: "bold", mb: 2 }}>
        You have some tracks to verify!
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Box>
        {tracksData.map((track) => (
          <Card
            key={track.id}
            sx={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "space-between",
              p: 2,
              mb: 1.5,
              gap: 10,
              boxShadow: "none",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              backgroundColor: "#fff",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* <Typography
                        variant="body2"
                        sx={{ width: '30px', textAlign: "center", fontWeight: "bold", color: "#8c8b8b", cursor: 'pointer' }}
                        onClick={handleIdClick}
                    >
                        {showFullId ? track.id : (track.id.length > 10 ? `${track.id.substring(0, 10)}...` : track.id)}
                    </Typography> */}
              <MoreVertIcon sx={{ color: "#8c8b8b", cursor: "pointer" }} />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexGrow: 1,
              }}
            >
              <Box
                component="img"
                src={trackCover}
                alt={`${track.title} cover`}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "4px",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box sx={{ minWidth: "100px" }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "#e53935", fontWeight: "bold" }}
                  >
                    {track.title}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {track.artist}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <CheckIcon
                sx={{ color: "#4caf50", cursor: "pointer" }}
                onClick={() => handleEnable(track.id)}
              />
              <CloseIcon
                sx={{ color: "#e53935", cursor: "pointer" }}
                onClick={() => handleDisable(track.id)}
              />
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
}
export default ManageRequest;
