import { useEffect, useState } from "react";

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch(
        "https://voting-app-backend-l94a.onrender.com/api/v1/candidate/vote/voteCount"
      );

      const data = await response.json();

      if (response.ok) {
        setResults(data);
      } else {
        alert("Unable to fetch results");
      }
    } catch (error) {
      console.error("Error fetching results:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading results...</h1>;
  }

  return (
    <div>
      <h1>Voting Results</h1>

      {results.length === 0 ? (
        <p>No candidates found</p>
      ) : (
        results.map((candidate, index) => (
          <div key={index}>
            <h2>
              #{index + 1} {candidate.name}
            </h2>

            <p>Party: {candidate.party}</p>

            <h3>Votes: {candidate.count}</h3>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Results;
