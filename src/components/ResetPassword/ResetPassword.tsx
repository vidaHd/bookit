import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  useState } from "react";
import "./ResetPassword.scss";
import { useAppContext } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { ButtonUI } from "../../ui-kit";
import { buttonType, VariantType } from "../../ui-kit/button/button.type";
import { useApiMutation } from "../../api/apiClient";

type ResetPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const ResetPasswordModal = ({ isOpen, onClose }: ResetPasswordModalProps) => {
  const [step, setStep] = useState<"password" | "sms">("password");
  const { theme, language } = useAppContext();
  const { t } = useTranslation("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [code, setCoede] = useState("");

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : { name: "" };

  const changePasswordMutation = useApiMutation<
    { message: string },
    { oldPassword: string; newPassword: string; name: string }
  >({
    url: "http://localhost:5000/request-reset-password",
    method: "POST",
    options: {
      onSuccess: () => {
        setStep("sms");
      },
      onError: (error: {message:string}) => {
        console.error("Error changing password:", error.message);
      },
    },
  });

  const verifyPasswordMutation = useApiMutation<
    { message: string },
    { code: string; name: string }
  >({
    url: "http://localhost:5000/check-reset-password",
    method: "POST",
    options: {
      onSuccess: () => {
        onClose();
      },
      onError: (error: {message:string}) => {
        console.error("Error changing password:", error.message);
      },
    },
  });

  const handleChangePassword = () => {
    changePasswordMutation.mutate({
      oldPassword,
      newPassword,
      name: user.name,
    });
  };

  const verifyPassword = () => {
    verifyPasswordMutation.mutate({
      code: code,
      name: user.name,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`modal-overlay ${theme}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ direction: language === "fa" ? "rtl" : "ltr" }}
        >
          <motion.div
            className="modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="close-btn" onClick={onClose}>
              ✖
            </button>

            {step === "password" && (
              <div className="modal-content">
                <h2>{t("reset_password.change_password")}</h2>
                <input
                  type="password"
                  placeholder={t("reset_password.current_password")}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder={t("reset_password.new_password")}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <ButtonUI
                  type={buttonType.BUTTON}
                  variant={VariantType.SECONDARY}
                  onClick={handleChangePassword}
                >
                  {t("reset_password.continue")}
                </ButtonUI>
              </div>
            )}

            {step === "sms" && (
              <div className="modal-content">
                <h2>{t("reset_password.sms_verification")}</h2>
                <p>{t("reset_password.sms_instruction")}</p>
                <input
                  value={code}
                  onChange={(e) => setCoede(e.target.value)}
                  type="text"
                  placeholder={t("reset_password.verification_code")}
                />
                <ButtonUI
                  type={buttonType.BUTTON}
                  variant={VariantType.SECONDARY}
                  onClick={verifyPassword}
                >
                  {t("reset_password.verify")}
                </ButtonUI>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ResetPasswordModal;
