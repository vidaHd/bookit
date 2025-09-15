import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Notification";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    familyName: "",
  });
  const [error, setError] = useState("");

  const setUserInformateion = (data: {
    token: string;
    user: { familyName: string; mobileNumber: string; name: string };
  }) => {
    const informationUSer = {
      name: data.user.name,
      familyName: data.user.familyName,
      mobileNumber: data.user.mobileNumber,
      token: data.token,
    };

    dispatch(setUser(informationUSer));

    navigate("/booking");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setUserInformateion(data);
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
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="family Name"
          value={formData.familyName}
          onChange={(e) =>
            setFormData({ ...formData, familyName: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
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
