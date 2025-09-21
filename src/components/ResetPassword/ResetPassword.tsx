import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "./ResetPassword.scss";
import { useAppContext } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { ButtonUI } from "../../ui-kit";
import { buttonType, VariantType } from "../../ui-kit/button/button.type";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const ResetPasswordModal = ({ isOpen, onClose }: Props) => {
  const [step, setStep] = useState<"password" | "sms">("password");
  const { theme, language } = useAppContext();
  const { t } = useTranslation('');

  const handleNext = () => {
    setStep("sms");
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
                <input type="password" placeholder={t("reset_password.current_password")} />
                <input type="password" placeholder={t("reset_password.new_password")} />
                <input type="password" placeholder={t("reset_password.repeat_new_password")} />
               <ButtonUI type={buttonType.BUTTON} variant={VariantType.SECONDARY} onClick={handleNext}>
                  {t("reset_password.continue")}
                </ButtonUI>
              </div>
            )}

            {step === "sms" && (
              <div className="modal-content">
                <h2>{t("reset_password.sms_verification")}</h2>
                <p>{t("reset_password.sms_instruction")}</p>
                <input type="text" placeholder={t("reset_password.verification_code")} />
                <ButtonUI type={buttonType.BUTTON} variant={VariantType.SECONDARY}>{t("reset_password.verify")}</ButtonUI>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ResetPasswordModal;
