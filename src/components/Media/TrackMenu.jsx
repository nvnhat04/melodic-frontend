import React from "react";
import MoreMenu from "../common/MoreMenu";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";

const TrackMenu = ({ TrackId, bgColor, moreColor }) => {
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
      text: "Play Next",
      onClick: () => console.log("Play Next Clicked"),
      icon: <PlayIcon />,
    },
    {
      text: "Play Last",
      onClick: () => console.log("Play Last Clicked"),
      icon: <PlayIcon />,
    },
    {
      text: "Favorite",
      onClick: () => console.log("Favorite Clicked"),
      icon: <FavoriteIcon />,
    },
  ];

  const addTrackToPlaylist = (TrackId) => {
    console.log(`Song with ID ${TrackId} added to playlist`);
  };

  return (
    <MoreMenu menuItems={menuItems} bgColor={bgColor} MoreColor={moreColor} />
  );
};

export default TrackMenu;
