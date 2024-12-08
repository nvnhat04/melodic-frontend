import React from "react";
import MoreMenu from "../common/MoreMenu";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import useFavorite from "../../hooks/useFavorite"; // Import the custom hook
import { useSelector } from "react-redux";

const TrackMenu = ({ TrackId, bgColor, moreColor }) => {

  const token = useSelector((state) => state.auth.token);
  // Use the custom hook for managing favorites
  const { isFavorite, addToFavorite, removeFromFavorite } = useFavorite(TrackId, token);

  // Add track to playlist function (example)
  const addTrackToPlaylist = (TrackId) => {
    console.log(`Song with ID ${TrackId} added to playlist`);
  };

  // Menu items for actions
  const menuItems = [
    {
      text: "Delete from Playlist",
      onClick: () => console.log("Delete from Playlist Clicked"),
      icon: <DeleteIcon />,
    },
    {
      text: "Add to Playlist",
      onClick: () => addTrackToPlaylist(TrackId),
      icon: <AddIcon />,
    },
    {
      text: isFavorite ? "Remove from Favorites" : "Add to Favorites",
      onClick: () => {
        if (isFavorite) {
          removeFromFavorite();
        } else {
          addToFavorite();
        }
      },
      icon: isFavorite ? <FavoriteIcon /> : <FavoriteIcon sx={{ color: "gray" }} />,
    },
  ];

  return (
    <MoreMenu menuItems={menuItems} bgColor={bgColor} MoreColor={moreColor} />
  );
};

export default TrackMenu;
