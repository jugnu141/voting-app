import { useEffect, useState } from "react";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const API_URL = "http://localhost:4000/api/v1/candidate";

  const [candidates, setCandidates] = useState([]);
  const [results, setResults] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    party: "",
    age: "",
  });

  const [loading, setLoading] = useState(false);

  // ================================
  // FETCH CANDIDATES
  // ================================
  const fetchCandidates = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.success) {
        setCandidates(data.candidates);
      } else {
        alert(data.message || "Unable to fetch candidates");
      }
    } catch (error) {
      console.error("Fetch candidates error:", error);
      alert("Unable to connect to backend");
    }
  };

  // ================================
  // FETCH RESULTS
  // ================================
  const fetchResults = async () => {
    try {
      const response = await fetch(
        `${API_URL}/vote/voteCount`
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setResults(data);
      } else {
        alert("Unable to fetch election results");
      }
    } catch (error) {
      console.error("Fetch results error:", error);
      alert("Unable to fetch election results");
    }
  };

  // ================================
  // LOAD DATA WHEN PAGE OPENS
  // ================================
  useEffect(() => {
    fetchCandidates();
    fetchResults();
  }, []);

  // ================================
  // HANDLE INPUT CHANGE
  // ================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================================
  // OPEN ADD FORM
  // ================================
  const handleAddCandidate = () => {
    setEditingCandidate(null);

    setFormData({
      name: "",
      party: "",
      age: "",
    });

    setShowForm(true);
  };

  // ================================
  // OPEN EDIT FORM
  // ================================
  const handleEditCandidate = (candidate) => {
    setEditingCandidate(candidate);

    setFormData({
      name: candidate.name,
      party: candidate.party,
      age: candidate.age,
    });

    setShowForm(true);
  };

  // ================================
  // ADD / UPDATE CANDIDATE
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.party || !formData.age) {
      alert("Please fill all candidate details");
      return;
    }

    setLoading(true);

    try {
      let response;

      if (editingCandidate) {
        // UPDATE
        response = await fetch(
          `${API_URL}/${editingCandidate._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: formData.name,
              party: formData.party,
              age: Number(formData.age),
            }),
          }
        );
      } else {
        // ADD
        response = await fetch(
          `${API_URL}/addCandidate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: formData.name,
              party: formData.party,
              age: Number(formData.age),
            }),
          }
        );
      }

      const data = await response.json();

      if (response.ok) {
        alert(
          editingCandidate
            ? "Candidate updated successfully!"
            : "Candidate added successfully!"
        );

        setShowForm(false);

        setFormData({
          name: "",
          party: "",
          age: "",
        });

        setEditingCandidate(null);

        fetchCandidates();
        fetchResults();
      } else {
        alert(
          data.message ||
            data.error ||
            "Operation failed"
        );
      }
    } catch (error) {
      console.error("Candidate operation error:", error);
      alert("Unable to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // DELETE CANDIDATE
  // ================================
  const handleDeleteCandidate = async (candidateId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this candidate?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${candidateId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Candidate deleted successfully!");

        fetchCandidates();
        fetchResults();
      } else {
        alert(
          data.message ||
            data.error ||
            "Unable to delete candidate"
        );
      }
    } catch (error) {
      console.error("Delete candidate error:", error);
      alert("Unable to connect to backend");
    }
  };

  // ================================
  // LOGOUT
  // ================================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "#0f172a",
        color: "#f8fafc",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "42px",
                marginBottom: "8px",
              }}
            >
              Admin Dashboard
            </h1>

            <p
              style={{
                fontSize: "18px",
                color: "#cbd5e1",
              }}
            >
              Welcome, {user?.name || "Admin"}!
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "12px 22px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Logout
          </button>
        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <div
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "12px",
              border: "1px solid #334155",
            }}
          >
            <p style={{ color: "#94a3b8" }}>
              Total Candidates
            </p>

            <h2 style={{ fontSize: "36px", margin: "8px 0" }}>
              {candidates.length}
            </h2>
          </div>

          <div
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "12px",
              border: "1px solid #334155",
            }}
          >
            <p style={{ color: "#94a3b8" }}>
              Total Votes
            </p>

            <h2 style={{ fontSize: "36px", margin: "8px 0" }}>
              {results.reduce(
                (total, candidate) =>
                  total + Number(candidate.count || 0),
                0
              )}
            </h2>
          </div>
        </div>

        {/* CANDIDATE MANAGEMENT */}
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "12px",
            border: "1px solid #334155",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2 style={{ marginBottom: "5px" }}>
                Candidate Management
              </h2>

              <p style={{ color: "#94a3b8" }}>
                Add, edit or remove election candidates.
              </p>
            </div>

            <button
              onClick={handleAddCandidate}
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                padding: "12px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              + Add Candidate
            </button>
          </div>

          {/* ADD / EDIT FORM */}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              style={{
                background: "#0f172a",
                padding: "25px",
                borderRadius: "10px",
                marginBottom: "25px",
                border: "1px solid #475569",
              }}
            >
              <h3 style={{ marginBottom: "20px" }}>
                {editingCandidate
                  ? "Edit Candidate"
                  : "Add New Candidate"}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "15px",
                }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Candidate Name"
                  value={formData.name}
                  onChange={handleChange}
                  style={inputStyle}
                />

                <input
                  type="text"
                  name="party"
                  placeholder="Party Name"
                  value={formData.party}
                  onChange={handleChange}
                  style={inputStyle}
                />

                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginTop: "20px" }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "11px 20px",
                    borderRadius: "7px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  {loading
                    ? "Saving..."
                    : editingCandidate
                    ? "Update Candidate"
                    : "Add Candidate"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingCandidate(null);
                  }}
                  style={{
                    background: "#475569",
                    color: "white",
                    border: "none",
                    padding: "11px 20px",
                    borderRadius: "7px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* CANDIDATE LIST */}
          {candidates.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>
              No candidates found.
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {candidates.map((candidate) => (
                <div
                  key={candidate._id}
                  style={{
                    background: "#0f172a",
                    padding: "18px",
                    borderRadius: "10px",
                    border: "1px solid #334155",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h3 style={{ marginBottom: "5px" }}>
                      {candidate.name}
                    </h3>

                    <p
                      style={{
                        color: "#94a3b8",
                        margin: "3px 0",
                      }}
                    >
                      Party: {candidate.party}
                    </p>

                    <p
                      style={{
                        color: "#94a3b8",
                        margin: "3px 0",
                      }}
                    >
                      Age: {candidate.age}
                    </p>

                    <p
                      style={{
                        color: "#60a5fa",
                        margin: "3px 0",
                      }}
                    >
                      Votes: {candidate.voteCount || 0}
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() =>
                        handleEditCandidate(candidate)
                      }
                      style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "9px 15px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "8px",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteCandidate(candidate._id)
                      }
                      style={{
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "9px 15px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ELECTION RESULTS */}
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "12px",
            border: "1px solid #334155",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <div>
              <h2 style={{ marginBottom: "5px" }}>
                Election Results
              </h2>

              <p style={{ color: "#94a3b8" }}>
                Live vote count for each candidate.
              </p>
            </div>

            <button
              onClick={fetchResults}
              style={{
                background: "#7c3aed",
                color: "white",
                border: "none",
                padding: "11px 18px",
                borderRadius: "7px",
                cursor: "pointer",
              }}
            >
              Refresh Results
            </button>
          </div>

          {results.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>
              No election results available.
            </p>
          ) : (
            <div>
              {results.map((candidate, index) => (
                <div
                  key={`${candidate.name}-${index}`}
                  style={{
                    background: "#0f172a",
                    padding: "18px",
                    borderRadius: "10px",
                    marginBottom: "12px",
                    border: "1px solid #334155",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h3>{candidate.name}</h3>

                    <p
                      style={{
                        color: "#94a3b8",
                        marginTop: "5px",
                      }}
                    >
                      {candidate.party}
                    </p>
                  </div>

                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {candidate.count} votes
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  borderRadius: "7px",
  border: "1px solid #475569",
  background: "#1e293b",
  color: "white",
  fontSize: "15px",
};

export default AdminDashboard;