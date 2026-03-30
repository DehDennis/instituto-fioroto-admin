import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Drawer variant="permanent" sx={{ bgcolor: "secondary.main", color: "primary.main" }}>
      <List>
        <ListItem button component={Link} to="/agenda">
          <ListItemIcon><CalendarMonthIcon sx={{ color: "#FFD700" }} /></ListItemIcon>
          <ListItemText primary="Agenda" />
        </ListItem>
        <ListItem button component={Link} to="/doctors">
          <ListItemIcon><PeopleIcon sx={{ color: "#FFD700" }} /></ListItemIcon>
          <ListItemText primary="Doutores" />
        </ListItem>
        <ListItem button component={Link} to="/gallery">
          <ListItemIcon><PhotoLibraryIcon sx={{ color: "#FFD700" }} /></ListItemIcon>
          <ListItemText primary="Galeria" />
        </ListItem>
        <ListItem button component={Link} to="/reports">
          <ListItemIcon><BarChartIcon sx={{ color: "#FFD700" }} /></ListItemIcon>
          <ListItemText primary="Relatórios" />
        </ListItem>
      </List>
    </Drawer>
  );
}
