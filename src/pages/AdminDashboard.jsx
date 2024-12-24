import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const drawerWidth = 240;
import accountApi from "../api/modules/account.api";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { Button } from "@mui/material";
import { clearToken } from "../redux/store";
import createURL from "../hooks/createUrl";

function AdminDashboard() {
    const user_id = useSelector((state) => state.auth.user_id);
    const [selectedItem, setSelectedItem] = useState("Dashboard");
    const [user, setUser] = useState([]);
    const dispatch = useDispatch();
    // const [usersData, setUsersData] = useState([]);
    // const [tracksData, setTracksData] = useState([]);
    // const [playlistsData, setPlaylistsData] = useState([]);
    const navigate = useNavigate();
    const handleLogout = () => {
      dispatch(clearToken());
      navigate("/login");
    };

    const handleNavigate = (path, item) => {
      navigate(path);
      setSelectedItem(item);
    }
    const fetchUsers = async () => {
      try {
        const res = await accountApi.getUserById(user_id);
        if (res && res.length > 0) {
          setUser(res[0]);
          console.log("Users found:", res[0]);
        } else {
          console.error("No users found");
        }
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    useEffect(() => {
      // fetch users data
      // accountApi.getAllUsers().then((res) => {
      //   setUsersData(res);
      // });
      // // fetch tracks data
      // trackApi.getAllTracks().then((res) => {
      //   setTracksData(res);
      // });
      // // fetch playlists data
      // playlistApi.getAllPlaylists().then((res) => {
      //   setPlaylistsData(res);
      // });
      fetchUsers();
      setSelectedItem("Dashboard");
      navigate("/admin");
    }, []);
    return (
      <Box sx={{ display: "flex", backgroundColor: "#f9f9f9", height: "100vh" }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#f1f1f1",
              borderRight: "1px solid #e0e0e0",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
            <Avatar
              src={createURL(user.avatar)}
              sx={{ width: 80, height: 80, mb: 1 }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>{user.display_name}</Typography>
            <Typography variant="body2" color="text.secondary">{user.user_role}</Typography>
            <Button variant="contained" color="primary" sx={{ fontSize: '10px', color: '#e0e0e0', backgroundColor:'#d60017' }} onClick={handleLogout}>Logout</Button>
          </Box>
          <Divider />
          {/*Sidebar */}
          <List>
            {[
              { text: "Dashboard", icon: <HomeIcon />, path: "/admin" },
              { text: "Users", icon: <PeopleIcon />, path: "/admin/users" },
              { text: "Tracks", icon: <LibraryMusicIcon />, path: "/admin/tracks" },
              { text: "Playlists", icon: <PlaylistPlayIcon />, path: "/admin/playlists" },
            ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigate(item.path, item.text)}
                  // handleNavigate(item.path)
                  //handleItemClick(item.text)
                  sx={{
                    backgroundColor: selectedItem === item.text ? "#f5f5f5" : "transparent",
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "#d60017" }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ color: selectedItem === item.text ? "#d60017" : "text.primary" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
  
        <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
          {/* {selectedItem === "Dashboard" && (
            <ManageRequest mockTracksData={mockTracksData}/>
          )} */}
          {/* {selectedItem === "Users" && (
            <Management delete={accountApi.deleteUser} getAllData={accountApi.getAllUsers} items={usersData} columns={users}/>
          )}
          {selectedItem === "Tracks" && (
            <Management delete={trackApi.deleteTrackById} getAllData={trackApi.getAllTracks} items={tracksData} columns={tracks}/>
          )}
          {selectedItem === "Playlists" && (
            <Management delete={playlistApi.deletePlaylist} getAllData={playlistApi.getAllPlaylists} items={playlistsData} columns={playlists}/>
          )} */}
          <Outlet />
         {/* Add other pages here */}
        </Box>
      </Box>
    );
}

export default AdminDashboard;
