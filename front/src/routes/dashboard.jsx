import DashboardPage from "views/Dashboard/Dashboard.jsx";

import { Dashboard } from "@material-ui/icons";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage
  }
];

export default dashboardRoutes;
