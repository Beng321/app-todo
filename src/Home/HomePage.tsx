import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ textAlign: "center", fontSize: "22px" }}>
      <h1>Welcome to app todo</h1>
      <button
        title="Press me"
        style={{
          color: "#5680f9",
          fontSize: "22px",
          fontWeight: "700",
          letterSpacing: ".5px",
          lineHeight: "30px",
          boxSizing: "border-box",
          borderBottom: "1px solid #ccc",
          border: "2px",
        }}
      >
        <Link to="/app-todo">Go to App Todo</Link>
      </button>
    </div>
  );
};

export default HomePage;
