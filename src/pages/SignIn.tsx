import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Notification";

const Sign = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/booking");
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <motion.div
      onSubmit={handleSignIn}
      className="login-page"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Sign In</h1>
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
        <button type="submit">Sign In</button>
      </motion.form>

      <AnimatePresence>
        <Toast message={error} onClose={() => setError("")} />
      </AnimatePresence>
    </motion.div>
  );
};

export default Sign;
