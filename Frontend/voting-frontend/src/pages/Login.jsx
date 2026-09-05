import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [aadharCardNumber, setAadharCardNumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Normal user/admin login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!aadharCardNumber || !password) {
      alert("Please fill all details");
      return;
    }

    try {
      const response = await fetch(
        "https://voting-app-backend-l94a.onrender.com/api/v1/user/login",
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

        // Save authentication data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect based on role
        if (data.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect to server");
    }
  };

  // Demo Admin Login
  const handleDemoLogin = async () => {
    try {
      const response = await fetch(
        "https://voting-app-backend-l94a.onrender.com/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            aadharCardNumber: "65656565",
            password: "DemoAdmin@123",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Demo Admin login successful!");

        // Save authentication data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Go to Admin Dashboard
        navigate("/admin");
      } else {
        alert(data.message || "Demo Admin login failed");
      }
    } catch (error) {
      console.error("Demo login error:", error);
      alert("Unable to connect to server");
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

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>

      <br />

      <button type="button" onClick={handleDemoLogin}>
        🚀 Try Demo Admin
      </button>
    </div>
  );
}

export default Login;
