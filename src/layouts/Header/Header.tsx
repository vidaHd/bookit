import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import "./Header.scss";
import { RootState } from "../../store/store";
import { clearUser } from "../../slices/userSlice";
import { ButtonUI } from "../../ui-kit";
import { VariantType } from "../../ui-kit/button/button.type";
import { SvgLanguage, ThemeModeSvg } from "../../constant";
import { useAppContext } from "../../context/LanguageContext";

const Header = () => {
  const name = useSelector((state: RootState) => state.user);
  const { language, setLanguage, theme, toggleTheme } = useAppContext();

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
      <h2 className="logo" onClick={() => (window.location.href = "/")}>
        BookIt
      </h2>
      <div className="nav">
        {!name.token ? (
          <>
            <ButtonUI
              variant={VariantType.ICON}
              onClick={() => setLanguage(language === "en" ? "fa" : "en")}
            >
              <SvgLanguage />
            </ButtonUI>

            <ButtonUI variant={VariantType.ICON} onClick={toggleTheme}>
              <ThemeModeSvg />
            </ButtonUI>

            <ButtonUI
              variant={VariantType.PRIMARY}
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </ButtonUI>

            <ButtonUI
              variant={VariantType.SECONDARY}
              onClick={() => (window.location.href = "/register")}
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
};

export default Header;
