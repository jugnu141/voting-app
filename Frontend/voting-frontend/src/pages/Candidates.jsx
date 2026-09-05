import { useEffect, useState } from "react";

function Candidates() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch("https://voting-app-backend-l94a.onrender.com/api/v1/candidate/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCandidates(data.candidates);
      })
      .catch((error) => {
        console.error("Error fetching candidates:", error);
      });
  }, []);

  return (
    <div>
      <h1>Our Candidates</h1>

      {candidates.map((candidate) => (
        <div key={candidate._id}>
          <h2>{candidate.name}</h2>
          <p>Party: {candidate.party}</p>
          <p>Age: {candidate.age}</p>
        </div>
      ))}
    </div>
  );
}

export default Candidates;
