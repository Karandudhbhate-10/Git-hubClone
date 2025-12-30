import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createRepository.css";

const CreateRepository = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) {
      setError("Repository name is required");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/auth");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post(
        `${import.meta.env.VITE_API_URL}${userId}`, // ✅ FIX
        {
          name,
          description,
          visibility: !isPrivate, // optional mapping
        }
      );

      navigate("/", { state: { refreshRepos: true } });
    } catch (err) {
      console.error(err.response?.data || err);
      setError("Failed to create repository");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-repo-wrapper">
      <h1>Create a new repository</h1>
      <p className="subtitle">
        A repository contains all project files, including the revision history.
      </p>

      <div className="form-card">
        <label>Repository name *</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="my-awesome-project"
        />

        <label>Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description of your project"
        />

        <div className="radio-group">
          <label>
            <input
              type="radio"
              checked={!isPrivate}
              onChange={() => setIsPrivate(false)}
            />
            Public
            <span>Anyone can see this repository</span>
          </label>

          <label>
            <input
              type="radio"
              checked={isPrivate}
              onChange={() => setIsPrivate(true)}
            />
            Private
            <span>You choose who can see this repository</span>
          </label>
        </div>

        {error && <p className="error">{error}</p>}

        <button onClick={handleCreate} disabled={loading}>
          {loading ? "Creating..." : "Create repository"}
        </button>
      </div>
    </div>
  );
};

export default CreateRepository;
