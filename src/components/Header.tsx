import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { clearUser } from "../slices/userSlice";
import "../styles/header.scss";

export default function Header() {
  const name = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    dispatch(clearUser());
  };

  const goToProfilePage = ()=>{
    window.location.href = "/profile";
  }

  return (
  <motion.header
  className="header"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h2 className="logo">BookIt</h2>
  <div className="nav">
    {!name.token ? (
      <>
        <button className="btn login" onClick={() => (window.location.href = "/login")}>Login</button>
        <button className="btn sign" onClick={() => (window.location.href = "/sign")}>Sign In</button>
      </>
    ) : (
      <div className="user-info" onClick={goToProfilePage}>
        <span>{name.name}</span>
        <span>{name.familyName}</span>
        <button className="btn logout" onClick={logOut}>Log out</button>
      </div>
    )}
  </div>
</motion.header>


  );
}
