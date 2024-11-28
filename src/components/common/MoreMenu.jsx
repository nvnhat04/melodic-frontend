import React from "react";
import { useState } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  List,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import More from "@mui/icons-material/More";
import Add from "@mui/icons-material/Add";
import CreatePlaylistPopup from "./CreatePlaylistPopup";

const playlists = [
  {
    id: 1,
    name: "Playlist 1",
  },
  {
    id: 2,
    name: "Playlist 2",
  },
  {
    id: 3,
    name: "Playlist 3",
  },
];

const MoreMenu = ({ isVertical = true, MoreColor = 'white', bgColor = 'rgba(40, 35, 36, 0.5)', menuItems = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const open = Boolean(anchorEl);
  const submenuOpen = Boolean(submenuAnchorEl);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubmenuAnchorEl(null);
  };
  const handleSubmenuOpen = (event) => {
    setSubmenuAnchorEl(event.currentTarget);
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
  };


  return (
    <>
      <IconButton onClick={handleClick}>
        {isVertical ? (
          <MoreVertIcon
            sx={{
              color: MoreColor, // Màu icon
            }}
          />
        ) : (
          <MoreHorizIcon sx={{ color: MoreColor }} />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: bgColor, // Màu nền cho menu
            backdropFilter: 'blur(100px)',
            borderRadius: "0.5rem", // Bo tròn các góc
          
          },
          "& .MuiMenuItem-root": {
            "&:hover": {
              backgroundColor: "gray", // Màu nền khi hover
            },
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        disableScrollLock
        
      >
        {menuItems.map((item, index) => (
          <MenuItem
            onClick={item.onClick}
            key={index}
            onMouseEnter={item.text === "Add to Playlist" ? handleSubmenuOpen : null}
            // onMouseLeave={item.text === "Add to Playlist" ? handleSubmenuClose : null}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center", // Đảm bảo căn giữa theo chiều dọc
              paddingLeft: "1rem", // Khoảng cách cách rìa bên trái
              borderBottom:
                index < menuItems.length - 1 ? "2px solid grey" : "none", // Thêm border giữa các item
            }}
          >
            <ListItemText
              primary={item.text}
              sx={{ color: "white", marginRight: "2rem" }}
              primaryTypographyProps={{ fontSize: "13px" }}
            />
            <ListItemIcon sx={{ color: "white", }}>{item.icon}</ListItemIcon>
          </MenuItem>
        ))}

        <Menu
        open={submenuOpen}
        anchorEl={submenuAnchorEl}
        onClose={handleSubmenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: bgColor, // Màu nền cho menu
            backdropFilter: 'blur(100px)',
            borderRadius: "0.6rem", // Bo tròn các góc
          
          },
          "& .MuiMenuItem-root": {
            "&:hover": {
              backgroundColor: "gray", // Màu nền khi hover
            },
          },
          overflowY: 'auto',

        }}
        
        onMouseLeave={handleSubmenuClose}
      >
        <MenuItem 
        onClick={() => setIsPopupOpen(true)}
        sx={{ borderBottom: "1px solid gray" }}
        >
        <ListItemText sx={{ color: "white", marginRight: "2rem" }}
              primaryTypographyProps={{ fontSize: "13px" }}>New Playlist</ListItemText>
        <ListItemIcon sx={{ color: "white" }}>{<Add />}</ListItemIcon>
        </MenuItem>
        <CreatePlaylistPopup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        {playlists.map((playlist) => (
          <MenuItem
            onClick={() => console.log(`${playlist.name} clicked`)}
            key={playlist.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center", // Đảm bảo căn giữa theo chiều dọc
              paddingLeft: "1rem", // Khoảng cách cách rìa bên trái
            }}
          >
            <ListItemText
              primary={playlist.name}
              sx={{ color: "white", marginRight: "2rem" }}
              primaryTypographyProps={{ fontSize: "13px" }}
            />
          </MenuItem>
        ))}
      </Menu>
      </Menu>
    </>
  );
};

export default MoreMenu;
