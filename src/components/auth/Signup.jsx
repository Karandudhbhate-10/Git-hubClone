import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/github-mark-white.svg";
import { useAuth } from "../../authContext";
import "./auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
        email,
        username,
        password,
      });

      // 🔐 persist auth
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      // 🔥 update auth context
      setCurrentUser(res.data.userId);

      setLoading(false);

      // ✅ redirect to dashboard
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Signup Failed!");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        {/* GitHub logo */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <img src={logo} alt="GitHub" style={{ width: "48px" }} />
        </div>

        <h3
          style={{ textAlign: "center", color: "white", marginBottom: "16px" }}
        >
          Create your account
        </h3>

        <form className="auth-card" onSubmit={handleSignup}>
          <label className="label">Username</label>
          <input
            className="input"
            type="text"
            value={username}
            name="username"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="label">Email address</label>
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" disabled={loading}>
            {loading ? "Loading..." : "Sign up"}
          </button>

          <p style={{ textAlign: "center", marginTop: "16px" }}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
