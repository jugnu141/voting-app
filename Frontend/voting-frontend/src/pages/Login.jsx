import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [aadharCardNumber, setAadharCardNumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!aadharCardNumber || !password) {
      alert("Please fill all details");
      return;
    }

    try {
      const response = await fetch(
        "https://voting-app-backend-l94a.onrender.com/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            aadharCardNumber: aadharCardNumber,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Login successful");

        // Save token for protected routes later
        localStorage.setItem("token", data.token);

        // Save logged-in user data
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter Aadhar Card Number"
          value={aadharCardNumber}
          onChange={(e) => setAadharCardNumber(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
