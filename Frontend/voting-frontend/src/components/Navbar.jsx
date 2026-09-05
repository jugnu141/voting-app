import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [isAdmin, setIsAdmin] = useState(false);

  // Check login and admin status whenever route changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    setIsLoggedIn(!!token);
    setIsAdmin(user?.role === "admin");
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setIsAdmin(false);

    alert("Logged out successfully");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Voting App</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/candidates">Candidates</Link>

            <Link to="/vote">Vote</Link>

            <Link to="/results">Results</Link>

            {/* Admin Dashboard - only visible to admins */}
            {isAdmin && (
              <Link to="/admin">
                Admin Dashboard
              </Link>
            )}

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
