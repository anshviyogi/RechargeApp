import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import AgentDashboard from 'views/agent/default'
import ViewAgentAccounts from 'views/agent/views'
import ViewAdminAccounts from 'views/admin/views'

// Import PDO Components
import PDODashboard from 'views/pdo/default'
import PDOAccount from 'views/pdo/marketplace'
import ViewPdoAccounts from 'views/pdo/views'

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import Accounts from "views/agent/marketplace";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Accounts",
    layout: "/admin",
    path: "accounts",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Views",
    layout: "/admin",
    path: "view",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <ViewAdminAccounts />,
    secondary: true,
  },
  {
    name: "Dashboard",
    layout: "/agent",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <AgentDashboard />,
  },
  {
    name: "Accounts",
    layout: "/agent",
    path: "accounts",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Accounts />,
    secondary: true,
  },
  {
    name: "Views",
    layout: "/agent",
    path: "view",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <ViewAgentAccounts />,
    secondary: true,
  },
  {
    name: "Dashboard",
    layout: "/pdo",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <PDODashboard />,
  },
  {
    name: "Accounts",
    layout: "/pdo",
    path: "accounts",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <PDOAccount />,
    secondary: true,
  },
  {
    name: "Views",
    layout: "/pdo",
    path: "view",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <ViewPdoAccounts />,
    secondary: true,
  },
];

export default routes;
