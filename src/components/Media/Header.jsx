import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  useMediaQuery,
} from "@mui/material";
import { red, grey } from "@mui/material/colors";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MainMenu from "./PlaylistMenu";
import SongCardMenu from "../common/SongCardMenu";

const MediaHeader = ({
  media,
  mediaType,
}) => {
  const [open, setOpen] = useState(false);
  const textColor = red[500];
  const titleColor = grey[400];

  // Media query to check if the screen width is less than 50%
  const isSmallScreen = useMediaQuery("(max-width: 50%)");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    {mediaType === "playlist" && (
      <Card
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: isSmallScreen ? "center" : "left",
        bgcolor: "#121212",
        color: "#fff",
        position: "relative",
      }}
    >
      {/* More Options Icon */}
      <Box sx={{ position: "absolute", bottom: 8, right: 8 }}>
        <MainMenu />
      </Box>

      <CardMedia
        component="img"
        image={media.imageSrc}
        alt="Playlist Cover"
        sx={{
          width: "100%",
          maxWidth: 300,
          borderRadius: 1,
          mb: isSmallScreen ? 2 : 0,
        }}
      />
      <CardContent sx={{ textAlign: isSmallScreen ? "center" : "left" }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom color={titleColor}>
          {media.title}
        </Typography>
        
        <Typography variant="subtitle1" color="white">
          {media.year}
        </Typography>
        {media.description && (
          <Typography variant="body2" color={titleColor} sx={{ mt: 1, mb: 1 }}>
            {media.description.length > 200
              ? `${media.description.substring(0, 200)}...`
              : media.description}
            {media.description.length > 200 && (
              <Button
                onClick={handleClickOpen}
                sx={{ textTransform: "none", color: textColor }}
              >
                MORE
              </Button>
            )}
          </Typography>
        )}

        {/* Play Button */}
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          sx={{
            mt: 3,
            bgcolor: textColor,
            "&:hover": { bgcolor: red[700] },
          }}
        >
          Play
        </Button>
      </CardContent>

      {/* Dialog Popup */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent sx={{
          bgcolor: "#121212",
        }}>
          <Typography variant="body1" color={titleColor}>{media.description}</Typography>
        </DialogContent>
        <DialogActions sx={{
          bgcolor: "#121212",
        }}>
          <Button
            onClick={handleClose}
            sx={{ color: textColor, borderColor: textColor }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
    )}

    {mediaType === "album" && (
      <Card
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: isSmallScreen ? "center" : "left",
        bgcolor: "#121212",
        color: "#fff",
        position: "relative",
      }}
    >
      {/* More Options Icon */}
      <Box sx={{ position: "absolute", bottom: 8, right: 8 }}>
        <MainMenu />
      </Box>

      <CardMedia
        component="img"
        image={media.imageSrc}
        alt="Playlist Cover"
        sx={{
          width: "100%",
          maxWidth: 300,
          borderRadius: 1,
          mb: isSmallScreen ? 2 : 0,
        }}
      />
      <CardContent sx={{ textAlign: isSmallScreen ? "center" : "left" }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom color={titleColor}>
          {media.title}
        </Typography>
        <Typography variant="h6" sx={{ color: textColor }}>
          {media.artist}
        </Typography>
        <Typography variant="subtitle1" color="white">
          {media.genre} • {media.year}
        </Typography>
        {media.description && (
          <Typography variant="body2" color={titleColor} sx={{ mt: 1, mb: 1 }}>
            {media.description.length > 200
              ? `${media.description.substring(0, 200)}...`
              : media.description}
            {media.description.length > 200 && (
              <Button
                onClick={handleClickOpen}
                sx={{ textTransform: "none", color: textColor }}
              >
                MORE
              </Button>
            )}
          </Typography>
        )}

        {/* Play Button */}
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          sx={{
            mt: 3,
            bgcolor: textColor,
            "&:hover": { bgcolor: red[700] },
          }}
        >
          Play
        </Button>
      </CardContent>

      {/* Dialog Popup */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent sx={{
          bgcolor: "#121212",
        }}>
          <Typography variant="body1" color={titleColor}>{media.description}</Typography>
        </DialogContent>
        <DialogActions sx={{
          bgcolor: "#121212",
        }}>
          <Button
            onClick={handleClose}
            sx={{ color: textColor, borderColor: textColor }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
      )}

    {mediaType === "track" && (
      <Card
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: isSmallScreen ? "center" : "left",
        bgcolor: "black",
        color: "#fff",
        position: "relative",
      }}
    >
      {/* More Options Icon */}
      <Box sx={{ position: "absolute", bottom: 8, right: 8 }}>
        <SongCardMenu />
      </Box>

      <CardMedia
        component="img"
        image={media.cover}
        alt="Track Cover"
        sx={{
          width: "100%",
          maxWidth: 300,
          borderRadius: 2,
          mb: isSmallScreen ? 2 : 0,
        }}
      />
      <CardContent sx={{ textAlign: isSmallScreen ? "center" : "left", mt: '1.5rem' }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom color={titleColor}>
          {media.title}
        </Typography>
        <Typography variant="h5" sx={{ color: textColor }}>
          {media.artist} • {media.album}
        </Typography>
        <Typography variant="subtitle1" color="white">
          {media.genre} • {media.year}
        </Typography>
        {media.description && (
          <Typography variant="body2" color={titleColor} sx={{ mt: 1, mb: 1 }}>
            {media.description.length > 200
              ? `${media.description.substring(0, 200)}...`
              : media.description}
            {media.description.length > 200 && (
              <Button
                onClick={handleClickOpen}
                sx={{ textTransform: "none", color: textColor }}
              >
                MORE
              </Button>
            )}
          </Typography>
        )}

        {/* Play Button */}
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          sx={{
            mt: '4rem',
            bgcolor: textColor,
            "&:hover": { bgcolor: red[700] },
          }}
        >
          Play
        </Button>
      </CardContent>

      {/* Dialog Popup */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent sx={{
          bgcolor: "#121212",
        }}>
          <Typography variant="body1" color={titleColor}>{media.description}</Typography>
        </DialogContent>
        <DialogActions sx={{
          bgcolor: "#121212",
        }}>
          <Button
            onClick={handleClose}
            sx={{ color: textColor, borderColor: textColor }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
      )}
    </>
  );
};

export default MediaHeader;
