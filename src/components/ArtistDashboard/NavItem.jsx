import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import Link from "@mui/material/Link";
// import ListItemButton from "@mui/material/ListItemButton";

const NavItem = styled(ListItem)(({ theme, selected }) => ({
  padding: 0,
  width: "100%",
  backgroundColor: selected ? theme.palette.action.selected : "inherit",
  "& .MuiLink-root": {
    width: "100%",
    textDecoration: "none",
    color: "inherit",
  },
  "& .MuiListItemButton-root": {
    display: "flex",
    width: "100%",
  },
}));

const NavItemIcon = styled(ListItemIcon)(() => ({
  minWidth: "40px",
}));

const NavItemText = styled(ListItemText)(() => ({
  flex: "1 1 auto",
}));

export { NavItem, NavItemIcon, NavItemText };
