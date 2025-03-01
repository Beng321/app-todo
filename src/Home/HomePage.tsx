import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1>Welcome to App Todo</h1>
      <Link to="/app-todo" className="todo-button">
        Go to App Todo
      </Link>
    </div>
  );
};

export default HomePage;
