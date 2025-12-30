import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/github-mark-white.svg";
import { useAuth } from "../../authContext";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      setLoading(false);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login Failed!");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <img src={logo} alt="GitHub" style={{ width: "48px" }} />
        </div>

        <h3
          style={{ textAlign: "center", color: "white", marginBottom: "16px" }}
        >
          Sign in to GitHub
        </h3>

        <form className="auth-card" onSubmit={handleLogin}>
          <label className="label">Email address</label>
          <input
            className="input"
            type="email"
            name="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" disabled={loading}>
            {loading ? "Loading..." : "Sign in"}
          </button>

          <p style={{ textAlign: "center", marginTop: "16px" }}>
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
