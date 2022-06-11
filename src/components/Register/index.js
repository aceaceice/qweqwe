import axios from "axios";
import { useState } from "react";
import instance from "../../axios";
import "./Register.css";
const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const registerUser = async () => {
    const res = await instance.post("/api/register", {
      name,
      email,
      password,
    });
    setMessage(res.data);
  };
  const validate = (callback) => {
    if (!email) {
      setEmailError("Email must not be empty");
    }
    if (!email.includes("@")) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
    if (!name) {
      setNameError("Enter your name");
    } else {
      setNameError("");
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
    if (!emailError && !passwordError && !nameError) {
      callback();
    }
  };

  return (
    <div className="login">
      Register
      <input
        placeholder="email"
        className="login-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="login-error">{emailError}</div>
      <input
        placeholder="name"
        className="login-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="login-error">{nameError}</div>
      <input
        placeholder="password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="login-error">{passwordError}</div>
      <div>{message}</div>
      <button
        className="login-button"
        onClick={async () => {
          validate(registerUser);
        }}
      >
        Register
      </button>
      <a href="/login" className="login-link">
        Log in
      </a>
    </div>
  );
};
export default Register;
