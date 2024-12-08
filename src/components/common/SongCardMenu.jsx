import React from "react";
import MoreMenu from "./MoreMenu";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveIcon from "@mui/icons-material/Delete";
import useFavorite from "../../hooks/useFavorite.jsx";
import { useSelector } from "react-redux";


const SongCardMenu = ({ songId, bgColor }) => {
  const token = useSelector((state) => state.auth.token);
  const { isFavorite, addToFavorite, removeFromFavorite } = useFavorite(songId, token);

  const addSongToPlaylist = (songId) => {
    console.log(`Song with ID ${songId} added to playlist`);
  };

  const onFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorite();
    } else {
      addToFavorite();
    }
  };

  const menuItems = [
    {
      text: "Add to Playlist",
      onClick: () => addSongToPlaylist(songId),
      icon: <AddIcon />,
    },
    {
      text: isFavorite ? "Remove Favorite" : "Add Favorite",
      onClick: onFavoriteClick,
      icon: isFavorite ? <RemoveIcon /> : <FavoriteIcon />,
    },
  ];

  return <MoreMenu menuItems={menuItems} bgColor={bgColor} />;
};

export default SongCardMenu;
