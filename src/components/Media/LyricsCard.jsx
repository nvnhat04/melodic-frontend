import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid2,
} from "@mui/material";

const LyricsCard = ({ lyrics }) => {
  const [open, setOpen] = useState(false);

  const textColor = "gray";

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
          width: "100%",
          bgcolor: "black",
          color: textColor,
          borderTop: "1px solid #333",
        }}
      >
        <CardContent>
          <Grid2 container spacing={2}>
            {/* Left Column for "Lyrics" Label */}
            <Grid2 item xs={3}>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{
                  color: textColor,
                  position: "relative",
                  top: "1vh",
                  left: "1vw",
                }}
              >
                Lyrics
              </Typography>
            </Grid2>
            {/* Right Column for Preview Lyrics */}
            {lyrics?.length === 0 ? (
              <Typography
                variant="body2"
                sx={{
                  position: "relative",
                  top: "1vh",
                  left: "16vw",
                }}
              >
                No Lyrics to display
              </Typography>
            ) : (
              <Grid2
                item
                xs={9}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  color: "#fff",
                  position: "relative",
                  top: "1vh",
                  left: "15vw",
                }}
              >
                {lyrics.slice(0, 2).map((line, index) => (
                  <Typography
                    variant="h7"
                    key={index}
                    color="white"
                    fontWeight="bold"
                  >
                    {line}
                  </Typography>
                ))}
                <Button
                  onClick={handleClickOpen}
                  sx={{
                    color: "red",
                    fontSize: "0.75rem",
                    justifyContent: "left",
                    padding: 0, // Removes extra padding
                    minWidth: 0, // Removes minimum width
                    textTransform: "none", // Keeps the text case as is (no uppercase transform)
                  }}
                >
                  View Full Lyrics
                </Button>
              </Grid2>
            )}
          </Grid2>
        </CardContent>
      </Card>

      {/* Dialog Popup for Full Lyrics */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            bgcolor: "#121212",
            color: "#fff",
          }}
        >
          Full Lyrics
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: "#121212",
          }}
        >
          <Grid2 container spacing={2}>
            {/* Right Column for Full Lyrics */}
            <Grid2 item xs={9}>
              {lyrics.map((line, index) => (
                <Typography variant="body1" key={index} color={textColor}>
                  {line}
                </Typography>
              ))}
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: "#121212",
          }}
        >
          <Button onClick={handleClose} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LyricsCard;
