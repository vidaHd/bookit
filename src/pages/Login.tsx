import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Notification";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = () => {
    navigate("/booking");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !password) {
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();
      if (res.ok) {
        handleSignIn();
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      className="login-page"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Login</h1>
      <motion.form
        className="login-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </motion.form>

      <AnimatePresence>
        <Toast message={error} onClose={() => setError("")} />
      </AnimatePresence>
    </motion.div>
  );
};

export default Login;
