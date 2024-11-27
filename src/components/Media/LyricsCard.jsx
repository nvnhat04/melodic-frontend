import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";

const LyricsCard = ({ lyrics }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 1200,
          bgcolor: 'rgba(40, 35, 36, 0.5)',
          width: "97%",
          color: "#fff",
          padding: "20px",
        }}
      >
        <CardContent>
          <Stack direction={{
            xs: "column",
            sm: "column",
            md: "row"
          }}
           spacing={2}>
            {/* Left Column for "Lyrics" Label */}
            <Stack sx={{ width: "25%" }}>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{
                  color: "gray",
                  position: "relative",
                  top: "1vh",
                  left: "1vw",
                }}
              >
                Lyrics
              </Typography>
            </Stack>
            {/* Right Column for Preview Lyrics and View Button */}
            <Stack sx={{ width: "75%" }}>
              {lyrics.slice(0, 2).map((line, index) => (
                <Typography variant="body1" key={index}>
                  {line}
                </Typography>
              ))}
              <Button
                variant="text"
                onClick={handleClickOpen}
                sx={{
                  color: "red",
                  fontSize: "0.7rem",
                  textAlign: "left",
                  padding: "0",
                  display: "block",
                  width: "150px",
                }}
              >
                View Full Lyrics
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Dialog Popup for Full Lyrics */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Full Lyrics</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2}>
            {/* Left Column for "Lyrics" Label in Popup */}
            <Stack sx={{ width: "25%" }}>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Lyrics
              </Typography>
            </Stack>
            {/* Right Column for Full Lyrics */}
            <Stack sx={{ width: "75%" }}>
              {lyrics.map((line, index) => (
                <Typography variant="body1" key={index}>
                  {line}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LyricsCard;
