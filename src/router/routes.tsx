import { Icon } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RoomServiceIcon from "@mui/icons-material/RoomService";

const routes = [
  {
    path: "/main",
    content: "Dashboard",
    icon: <Icon component={DashboardIcon} />,
  },
  {
    path: "/main/service",
    content: "Service",
    icon: <Icon component={RoomServiceIcon} />,
  },
];

export default routes;
