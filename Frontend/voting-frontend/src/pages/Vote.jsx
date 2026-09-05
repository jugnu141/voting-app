import { useEffect, useState } from "react";

function Vote() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch(
          "https://voting-app-backend-l94a.onrender.com/api/v1/candidate/"
        );

        const data = await response.json();

        if (response.ok) {
          setCandidates(data.candidates);
        } else {
          alert(data.message || "Failed to fetch candidates");
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
        alert("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Handle voting
  const handleVote = async (candidateId) => {
    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem("token");

      // Check if user is logged in
      if (!token) {
        alert("Please login first");
        return;
      }

      // Send vote request to backend
      const response = await fetch(
        `http://localhost:4000/api/v1/candidate/vote/${candidateId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Vote submitted successfully");
      } else {
        alert(data.message || "Voting failed");
      }
    } catch (error) {
      console.error("Voting error:", error);
      alert("Something went wrong");
    }
  };

  // Show loading message
  if (loading) {
    return (
      <div className="vote-container">
        <h1>Loading candidates...</h1>
      </div>
    );
  }

  return (
    <div className="vote-container">
      <h1>Vote for Your Candidate</h1>

      {candidates.length === 0 ? (
        <p>No candidates available</p>
      ) : (
        candidates.map((candidate) => (
          <div className="vote-card" key={candidate._id}>
            <h2>{candidate.name}</h2>

            <p>Party: {candidate.party}</p>

            <p>Age: {candidate.age}</p>

            <button onClick={() => handleVote(candidate._id)}>
              Vote
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Vote;
