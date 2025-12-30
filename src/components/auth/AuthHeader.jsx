import logo from "../../assets/github-mark-white.svg";

const AuthHeader = ({ title }) => {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <img
        src={logo}
        alt="GitHub"
        style={{ width: "48px", marginBottom: "16px" }}
      />
      <h1
        style={{
          color: "white",
          fontSize: "24px",
          fontWeight: "500",
        }}
      >
        {title}
      </h1>
    </div>
  );
};

export default AuthHeader;
