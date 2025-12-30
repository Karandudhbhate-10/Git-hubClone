import { BookIcon, RepoIcon } from "@primer/octicons-react";
import { UnderlineNav } from "@primer/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";
import HeatMapProfile from "./HeatMap";
import Navbar from "./Navbar";
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const [userDetails, setUserDetails] = useState({
    username: "Loading...",
  });

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/auth");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}${userId}` // ✅ FIXED PORT
        );
        setUserDetails(response.data);
      } catch (err) {
        console.error("Cannot fetch user details:", err);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
    navigate("/auth");
  };

  return (
    <>
      <Navbar />

      {/* PROFILE NAV */}
      <UnderlineNav aria-label="Profile navigation" sx={{ padding: "0 32px" }}>
        <UnderlineNav.Item
          aria-current="page"
          icon={BookIcon}
          sx={{ color: "white" }}
        >
          Overview
        </UnderlineNav.Item>

        <UnderlineNav.Item
          onClick={() => navigate("/repo")}
          icon={RepoIcon}
          sx={{ color: "whitesmoke" }}
        >
          Starred Repositories
        </UnderlineNav.Item>
      </UnderlineNav>

      {/* LOGOUT */}
      <button
        id="logout"
        onClick={handleLogout}
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
        }}
      >
        Logout
      </button>

      {/* PROFILE BODY */}
      <div className="profile-page-wrapper">
        <div className="user-profile-section">
          <img
            className="profile-image"
            src={`https://ui-avatars.com/api/?name=${userDetails.username}&background=0D1117&color=ffffff&size=200`}
            alt="User Avatar"
          />

          <div className="name">
            <h3>{userDetails.username}</h3>
          </div>
          <button
            className={`follow-btn ${isFollowing ? "following" : ""}`}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>

          <div className="follower">
            <p>10 Followers</p>
            <p>3 Following</p>
          </div>
        </div>

        <div className="heat-map-section">
          <HeatMapProfile />
        </div>
      </div>
    </>
  );
};

export default Profile;
