import { Link } from "react-router-dom";

const Navigation = ({ user, onLogout }) => (
  <header className="header-container">
    <div className="nav-links">
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
    </div>

    <div className="nav-user">
      <span>{user.username} logged in</span>
      <button onClick={onLogout}>logout</button>
    </div>
  </header>
);
export default Navigation;
