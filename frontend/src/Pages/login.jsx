import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          email,
          password,
        }
      );

      setCurrentUser(response.data.user);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("userId", response.data.user.user_id);

      window.location.href = "/home";
    } catch (error) {
      // Log the error for debugging
      console.error("Login error details:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        setError("Error logging in: " + error.response.data.message);
      } else if (error.request) {
        console.error("Request data:", error.request);
        setError("Error logging in: No response received");
      } else {
        console.error("Error message:", error.message);
        setError("Error logging in: " + error.message);
      }
    }
  };


  const recoverPassword = () => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/recoverPassword`,
      "_blank"
    );
  }

  return (
    <div className="form-container" style={{textAlign:"center"}}>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div id="input-container">
          <div>
            <label className="form-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="form-label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit">Login</button>
        <p className="word-link" onClick={recoverPassword}>Forgot Password?</p>
      </form>
    </div>
  );
};

export default Login;
