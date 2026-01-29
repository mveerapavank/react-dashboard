import "./login.css";
import logo from "../assets/logo.png";

export default function Login({ onLogin }) {
  return (
    <div className="login-wrapper">
      <div className="login-card">

<img src={logo} className="login-logo" />
<h3 className="admin-title">Admin Login</h3>

        <input placeholder="Username" />
        <input type="password" placeholder="Password" />

        <button onClick={onLogin}>Login</button>

        <span className="forgot">Forgot Password?</span>

      </div>
    </div>
  );
}
