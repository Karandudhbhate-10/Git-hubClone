import { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { useAuth } from "./authContext";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import CreateRepository from "./components/repo/CreateRepository";
import Profile from "./components/user/Profile";

import Layout from "./Layout";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId && !currentUser) {
      setCurrentUser(userId);
    }

    if (!userId && !["/auth", "/signup"].includes(window.location.pathname)) {
      navigate("/auth");
    }
  }, []);

  return useRoutes([
    {
      element: <Layout />, // 🔥 NAVBAR LIVES HERE
      children: [
        { path: "/", element: <Dashboard /> },
        // ⛔ TEMP REMOVE PROFILE (CAUSES CRASH)
      ],
    },
    { path: "/auth", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/create",
      element: <CreateRepository />,
    },
  ]);
};

export default ProjectRoutes;
