import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "../styles/profile.scss"

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const  ResetPasswordModal = ({ isOpen, onClose }: Props) =>{
  const [step, setStep] = useState<"password" | "sms">("password");

  const handleNext = () => {
    setStep("sms");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
                <h2>تغییر رمز عبور</h2>
                <input type="password" placeholder="رمز عبور فعلی" />
                <input type="password" placeholder="رمز عبور جدید" />
                <input type="password" placeholder="تکرار رمز عبور جدید" />
                <button className="btn" onClick={handleNext}>
                  ادامه
                </button>
              </div>
            )}

            {step === "sms" && (
              <div className="modal-content">
                <h2>تایید پیامکی</h2>
                <p>کدی که برای شما پیامک شده را وارد کنید</p>
                <input type="text" placeholder="کد تایید" />
                <button className="btn">تایید</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default ResetPasswordModal