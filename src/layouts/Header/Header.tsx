import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import "./Header.scss";
import { RootState } from "../../store/store";
import { clearUser } from "../../slices/userSlice";
import { ButtonUI } from "../../ui-kit";
import { VariantType } from "../../ui-kit/button/button.type";
import { useAppContext } from "../../context/LanguageContext";
import { SvgLanguage, ThemeModeSvg } from "../../constant/svg";
import { useTranslation } from "react-i18next";

const Header = () => {
  const name = useSelector((state: RootState) => state.user);
  console.log(name);
  
  const { language, changeLanguage, theme, toggleTheme } = useAppContext();
  const { t } = useTranslation();

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
  const goToAddNewCompanyPage = () => {
    window.location.href = "/add-new-company";
  };
  return (
    <motion.header
      className={`header ${theme}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="logo" onClick={() => (window.location.href = "/")}>
        BookIt
      </h2>

      <div className="nav">
        <>
          <ButtonUI
            variant={VariantType.ICON}
            onClick={() => changeLanguage(language === "en" ? "fa" : "en")}
          >
            <SvgLanguage />
          </ButtonUI>

          <ButtonUI variant={VariantType.ICON} onClick={toggleTheme}>
            <ThemeModeSvg />
          </ButtonUI>
          {!name.name && (
            <>
              <ButtonUI
                variant={VariantType.PRIMARY}
                onClick={() => (window.location.href = "/login")}
              >
                {t("header.login")}
              </ButtonUI>

              <ButtonUI
                variant={VariantType.SECONDARY}
                onClick={() => (window.location.href = "/register")}
              >
                {t("header.register")}
              </ButtonUI>
            </>
          )}
        </>
        {name.name ? (
          <div onClick={goToAddNewCompanyPage}>
            <span style={{ cursor: "pointer" }}>ساخت حساب شرکتی</span>
          </div>
        ) : (
          ""
        )}
        <div className="user-info" onClick={goToProfilePage}>
          <span>{name.name}</span>
          <span>{name.familyName}</span>
          {name.profile?.avatar && (
            <img src={`http://localhost:5000/${name.profile?.avatar}`} />
          )}

          <button className="btn logout" onClick={logOut}>
            {t("header.logout")}
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
