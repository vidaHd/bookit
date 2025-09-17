import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import "./Header.scss";
import { RootState } from "../../store/store";
import { clearUser } from "../../slices/userSlice";
import { ButtonUI } from "../../ui-kit";
import { ButtonType } from "../../ui-kit/button/button.type";

 const Header=() =>{
  const name = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    dispatch(clearUser());
  };

  const goToProfilePage = () => {
    window.location.href = "/profile";
  };

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
             <ButtonUI
            type={ButtonType.PRIMARY}
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </ButtonUI>

          <ButtonUI
            type={ButtonType.SECONDARY}
            onClick={() => (window.location.href = "/login")}
          >
            register
          </ButtonUI>

          </>
        ) : (
          <div className="user-info" onClick={goToProfilePage}>
            <span>{name.name}</span>
            <span>{name.familyName}</span>
            <img src={`http://localhost:5000/${name.profile?.avatar}`} />
            <button className="btn logout" onClick={logOut}>
              Log out
            </button>
          </div>
        )}
      </div>
    </motion.header>
  );
}

export default Header;