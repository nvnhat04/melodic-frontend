import React, { useState, useEffect } from "react";
import MoreMenu from "./MoreMenu";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveIcon from "@mui/icons-material/Delete";
import { addFavorite, removeFavorite, setListFavorites } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import FavoriteAPI from "../../api/modules/favorite.api";

const SongCardMenu = ({ songId, bgColor }) => {
  const token = useSelector((state) => state.auth.token);
  const favorites = useSelector((state) => state.favorite.listFavorites);
  const isFavorite = favorites.some((favorite) => favorite.track_id === songId);
  const dispatch = useDispatch();

  const addSongToPlaylist = (songId) => {
    console.log(`Song with ID ${songId} added to playlist`);
  };

  const onFavoriteClick = async () => {
    if (isFavorite) {
      await onRemoveFavorite();
    } else {
      await onAddFavorite();
    }
  };

  const onAddFavorite = async () => {
    try {
      const data = { track_id: songId };
      const result = await FavoriteAPI.addFavorite(data, token);

      if (!result || !result.track_id) {
        throw new Error("Failed to add favorite");
      }

      console.log("result", result);
      console.log("result track_id", result.track_id);

      dispatch(addFavorite(result.track_id)); // Lưu track_id vào Redux
      console.log("Added to favorites successfully");
    } catch (err) {
      console.error("Error adding favorite:", err);
    }
  };

  const onRemoveFavorite = async () => {
    try {
      const data = { track_id: songId };
      const result = await FavoriteAPI.removeFavorite(data, token);

      if (result.message === "Favorite removed") {
        dispatch(removeFavorite(songId)); // Sử dụng trực tiếp track_id
        console.log("Removed from favorites successfully");
      } else {
        throw new Error("Failed to remove favorite");
      }
    } catch (err) {
      console.error("Error removing favorite:", err);
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
