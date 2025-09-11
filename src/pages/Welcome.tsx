import { motion } from "framer-motion";
import Header from "../components/Header";

export default function Welcome() {
  return (
    <>
      <Header />
      <motion.div
        className="welcome-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Welcome to BookIt!</h1>
        <div className="buttons">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/sign")}
          >
            Sign In
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
