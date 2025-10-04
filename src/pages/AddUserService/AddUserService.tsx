import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";
import "./AddUserService";
import { ButtonUI } from "../../ui-kit";
import { buttonType, VariantType } from "../../ui-kit/button/button.type";
import ResetPasswordModal from "../../components/ResetPassword/ResetPassword";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/LanguageContext";
import { useApiMutation, useApiQuery } from "../../api/apiClient";

const AddUserService = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useAppContext();
  const service = localStorage.getItem("service")
    ? JSON.parse(localStorage.getItem("service")!)
    : null;

  const [formData, setFormData] = useState({
    duration: "",
    price: "",
  });
  const [error, setError] = useState("");
  const userId = JSON.parse(localStorage.getItem("user")!).id;

  const companyMutation = useApiMutation<
    any,
    { duration: string; serviceId?: string; price?: string }
  >({
    url: "http://localhost:5000/user-service",
    method: "POST",
    options: {
      onSuccess: (data) => {
        localStorage.setItem("userService", JSON.stringify(data));
         navigate("/available-time");
      },
      onError: (error: any) => {
        setError(error.message);
      },
    },
  });

  const handleAddDetailService = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      serviceId: service ? service?._id : "",
      duration: formData.duration,
      price: formData.price,
    };
    companyMutation.mutate(finalData);
  };

  return (
    <div className="company-page">
      <motion.div
        className="company-card"
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
        <p className="subtitle">ساخت سرویس</p>

        <motion.form
          className="company-form"
          onSubmit={handleAddDetailService}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="form-title">نام سرویس: {service?.title ?? ""}</span>
          <input
            type="text"
            placeholder="قیمت سرویس"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="مدت سرویس"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
          />

          {error && <span className="error">{error}</span>}

          <ButtonUI variant={VariantType.SECONDARY} type={buttonType.SUBMIT}>
            اظافه کردن جزئیات سرویس
          </ButtonUI>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AddUserService;
