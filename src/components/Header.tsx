import React from "react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>BookIt</h2>
      <div className="header-buttons">
        <button onClick={() => (window.location.href = "/login")}>Login</button>
        <button onClick={() => (window.location.href = "/sign")}>
          Sign In
        </button>
      </div>
    </motion.header>
  );
}
