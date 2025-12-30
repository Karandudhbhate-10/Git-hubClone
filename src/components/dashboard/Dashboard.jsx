import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const [repos, setRepos] = useState([]);

  const [trending, setTrending] = useState([]);
  const [search, setSearch] = useState("");
  const [starredRepos, setStarredRepos] = useState({});

  const toggleStar = (repoId) => {
    setStarredRepos((prev) => ({
      ...prev,
      [repoId]: !prev[repoId],
    }));
  };

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const fetchUserRepos = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/repo/user/${userId}`
        );

        const data = await res.json();
        setRepos(Array.isArray(data.repositories) ? data.repositories : []);
      } catch (err) {
        console.error("Repo fetch failed", err);
        setRepos([]);
      }
    };

    const fetchTrending = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/repo/all`);
        const data = await res.json();
        setTrending(data || []);
      } catch (err) {
        console.error("Failed to fetch trending repos", err);
      }
    };

    if (userId) {
      fetchUserRepos();
      fetchTrending();
    }
  }, [userId]);

  const handleDeleteRepo = async (repoId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this repository? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/repo/delete/${id}`, {
        method: "DELETE",
      });

      // Remove deleted repo from UI immediately
      setTrending((prev) => prev.filter((repo) => repo._id !== repoId));
      setRepos((prev) => prev.filter((repo) => repo._id !== repoId));
    } catch (err) {
      console.error("Failed to delete repository:", err);
      alert("Failed to delete repository");
    }
  };

  return (
    <>
      <div className="gh-dashboard ">
        {/* LEFT */}

        <aside className="gh-left">
          <div className="left-header">
            <h3>Top repositories</h3>

            <Link
              to="/create"
              className="new-btn"
              style={{ textDecoration: "none" }}
            >
              New
            </Link>
          </div>

          <input
            className="repo-search"
            placeholder="Find a repository..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="repo-list">
            {repos.length === 0 ? (
              <li className="empty">No repositories found</li>
            ) : (
              repos
                .filter((r) =>
                  r?.name?.toLowerCase().includes(search.toLowerCase())
                )
                .map((repo) => (
                  <li key={repo._id} className="repo-item">
                    <span className="repo-owner">{repo.owner?.username}</span>
                    <span className="repo-separator"> / </span>
                    <span className="repo-name">{repo.name}</span>
                  </li>
                ))
            )}
          </ul>
        </aside>

        {/* CENTER */}
        <main className="gh-main ">
          <div className="gh-main-inner">
            <h1>Home</h1>
            <br />

            <div className="ask-card">
              <input placeholder="Ask anything or add repositories, files, and spaces" />
              <div className="quick-actions">
                <button>Task</button>
                <button>Create issue</button>
                <button>Write code</button>
                <button>Pull requests</button>
              </div>
            </div>

            <h2 className="feed-title">Trending repositories</h2>
            {trending.map((repo) => {
              const isStarred = starredRepos[repo._id];

              return (
                <div key={repo._id} className="feed-card">
                  <div className="feed-header">
                    <strong>{repo.name}</strong>

                    <button
                      className={`star-btn ${isStarred ? "starred" : ""}`}
                      onClick={() => toggleStar(repo._id)}
                    >
                      {isStarred ? "★ Starred" : "☆ Star"}
                    </button>
                  </div>

                  <p>{repo.description}</p>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteRepo(repo._id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </main>

        {/* RIGHT */}
        <aside className="gh-right col-2">
          <div className="right-card">
            <h3>Latest from our changelog</h3>
            <ul className="updates-list">
              <li>
                <strong>Improved GitHub Actions performance</strong>
                <p>Faster workflow execution and reduced queue times.</p>
                <span>Last week</span>
              </li>

              <li>
                <strong>Dependabot security alerts update</strong>
                <p>More accurate vulnerability detection for npm and Maven.</p>
                <span>1 week ago</span>
              </li>

              <li>
                <strong>New repository insights released</strong>
                <p>View contributor trends and commit activity in one place.</p>
                <span>2 weeks ago</span>
              </li>

              <li>
                <strong>Pull request review improvements</strong>
                <p>Required reviews can now be enforced per branch.</p>
                <span>2 weeks ago</span>
              </li>

              <li>
                <strong>Copilot updates for Pro users</strong>
                <p>Better code suggestions and context awareness.</p>
                <span>3 weeks ago</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Dashboard;
