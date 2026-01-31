import React, { useState } from "react";
import "./login.css";
import logo from "../assets/logo.png";
import api, { login } from "../services/api"; // API service import

export default function Login({ onLogin }) {
  // Input values store cheyadaniki states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
  if (e) e.preventDefault();

  setError("");
  setLoading(true);

  try {
    const response = await login(email, password);

    // decode JWT payload
    const token = response.access_token;
    const payload = JSON.parse(atob(token.split(".")[1]));

    // send role + user to App
    onLogin({
      token,
      role: payload.role,
      user: payload.sub,
    });

  } catch (err) {
    setError(err.detail || err.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={logo} className="login-logo" alt="logo" />
        <h3 className="admin-title">Admin Login</h3>

        {/* Error message design disturb avvakunda chinna red text */}
        {error && (
          <p style={{ 
            color: "#ff4d4d", 
            fontSize: "12px", 
            marginBottom: "10px",
            textAlign: "center" 
          }}>
            {error}
          </p>
        )}

        <input 
          type="email"
          placeholder="Email Address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button 
          onClick={handleLogin} 
          disabled={loading}
          className={loading ? "opacity-50 cursor-not-allowed" : ""}
        >
          {loading ? "Verifying..." : "Login"}
        </button>

        <span className="forgot">Forgot Password?</span>
      </div>
    </div>
  );
}