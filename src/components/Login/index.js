import "./Login.css";
import { useState } from "react";
import { logIn } from "../../state/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
const API_URL = process.env.REACT_APP_API_URL;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  return (
    <div className="login">
      Login
      <input
        className="login-input"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="login-input"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="login-error">{error}</div>
      <button
        className="login-button"
        onClick={async () => {
          dispatch(logIn(email, password));
        }}
      >
        Login
      </button>
      <a href="/register" className="login-link">
        Don't have an account? Sign up.
      </a>
    </div>
  );
};
export default Login;
