import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";
import "./Login.scss";
import { ButtonUI, InputUI } from "../../ui-kit";
import { buttonType, VariantType } from "../../ui-kit/button/button.type";
import ResetPasswordModal from "../../components/ResetPassword/ResetPassword";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/LanguageContext";
import { InputType } from "../../ui-kit/input/input.type";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showResetModal, setShowResetModal] = useState(false);
  const { t } = useTranslation();
  const { language } = useAppContext();

  const [formData, setFormData] = useState({
    name: "",
    familyName: "",
    password: "",
  });
  const [error, setError] = useState("");

  const setUserInformation = (data: any) => {
    const user = {
      name: data.user.name,
      familyName: data.user.familyName,
      mobileNumber: data.user.mobileNumber,
      token: data.token,
      profile: data.user.profile,
    };
    dispatch(setUser(user));
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
      if (res.ok) setUserInformation(data);
      else setError(data.error);
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ButtonUI
          variant={VariantType.ICON}
          type={buttonType.BUTTON}
          onClick={() => (window.location.href = "/")}
        >
          {language === "fa" ? "→" : "←"}
        </ButtonUI>
        <h2 className="back">{t("login.welcomeBack")}</h2>
        <p className="subtitle">{t("login.subtitle")}</p>

        <motion.form
          className="login-form"
          onSubmit={handleLogin}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* <InputUI
            placeholder={t("login.firstName")}
            type={InputType.TEXT}
            variant={VariantType.PRIMARY}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          /> */}
          <input
            type="text"
            placeholder={t("login.firstName")}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder={t("login.familyName")}
            value={formData.familyName}
            onChange={(e) =>
              setFormData({ ...formData, familyName: e.target.value })
            }
          />
          <input
            type="password"
            placeholder={t("login.password")}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {error && <span className="error">{error}</span>}
          <ButtonUI variant={VariantType.SECONDARY}>
            {t("login.login")}
          </ButtonUI>
        </motion.form>

        <p className="forgot-password" onClick={() => setShowResetModal(true)}>
          {t("login.forgotPassword")}
        </p>
        <ButtonUI
          variant={VariantType.SECONDARY}
          onClick={() => (window.location.href = "/register")}
          type={buttonType.SUBMIT}
        >
          {t("login.register")}
        </ButtonUI>
        {showResetModal && (
          <ResetPasswordModal
            isOpen={showResetModal}
            onClose={() => setShowResetModal(false)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Login;
