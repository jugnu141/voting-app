import { Link } from "react-router-dom";

function Home() {
  const userData = localStorage.getItem("user");

  const user = userData ? JSON.parse(userData) : null;

  return (
    <div className="home-container">
      {user ? (
        <div className="welcome-card">
          <h1>Welcome, Indian Citizen 🇮🇳</h1>

          <h2>{user.name}</h2>

          <div className="user-details">
            <p>
              <strong>Aadhaar Number:</strong>{" "}
              {user.aadharCardNumber}
            </p>

            <p>
              <strong>Age:</strong> {user.age}
            </p>

            <p>
              <strong>Address:</strong> {user.address}
            </p>
          </div>

          <Link to="/vote">
            <button className="home-button">
              Go to Voting
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <h1>Welcome to Voting App 🗳️</h1>

          <p>Please login to participate in voting.</p>

          <Link to="/login">
            <button className="home-button">
              Login to Vote
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;