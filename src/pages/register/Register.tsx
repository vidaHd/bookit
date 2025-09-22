import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { ButtonUI } from "../../ui-kit";
import { buttonType, VariantType } from "../../ui-kit/button/button.type";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/LanguageContext";
import { useMutation } from "@tanstack/react-query";
import { useApiMutation } from "../../api/apiClient";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language } = useAppContext();

  const [formData, setFormData] = useState({
    name: "",
    familyName: "",
    mobileNumber: "",
    password: "",
  });

  const registerMutation = useApiMutation<
    { message: string },
    { name: string; familyName: string; mobileNumber: string; password: string }
  >({
    url: "http://localhost:5000/sign",
    method: "POST",
    options: {
      onSuccess: () => {
        navigate("/login");
      },
    },
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  return (
    <motion.div
      onSubmit={handleSignIn}
      className="login-page"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
        <h1>{t("register.title")}</h1>

        <motion.form
          className="login-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <input
            type="text"
            placeholder={t("register.name")}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder={t("register.familyName")}
            value={formData.familyName}
            onChange={(e) =>
              setFormData({ ...formData, familyName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder={t("register.mobileNumber")}
            value={formData.mobileNumber}
            onChange={(e) =>
              setFormData({ ...formData, mobileNumber: e.target.value })
            }
          />
          <input
            type="password"
            placeholder={t("register.password")}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <ButtonUI variant={VariantType.SECONDARY} type={buttonType.SUBMIT}>
            {t("register.submit")}
          </ButtonUI>
        </motion.form>
      </motion.div>

      <AnimatePresence></AnimatePresence>
    </motion.div>
  );
};

export default Register;
