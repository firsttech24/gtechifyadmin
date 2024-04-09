/** @format */

import { useState } from "react";
import styles from "./Login.module.css";
import logins from "../assets/login";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const findInd = logins.findIndex(
      (item) => item.username === username && item.password === password
    );
    if (findInd !== -1) {
      localStorage.setItem("gtechify", username);
      navigate("/form", { state: username });
      // toast.success("Login successful!");
    } else {
      // toast.error("Invalid username or password");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.form_front}>
          <div className={styles.form_details}>Login</div>
          <input
            placeholder="Username"
            className={styles.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            className={styles.input}
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={styles.btn}
            onClick={handleLogin}>
            Login
          </button>
          <span className={styles.switch}>Welcome to the project...</span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
