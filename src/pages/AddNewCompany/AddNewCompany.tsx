import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";
import "./AddNewCompany.scss";
import { ButtonUI } from "../../ui-kit";
import { buttonType, VariantType } from "../../ui-kit/button/button.type";
import ResetPasswordModal from "../../components/ResetPassword/ResetPassword";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/LanguageContext";
import { useApiMutation, useApiQuery } from "../../api/apiClient";

const AddNewCompany = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useAppContext();

  const [formData, setFormData] = useState({
    companyName: "",
    jobId: "",
  });
  const [error, setError] = useState("");
  const userId = JSON.parse(localStorage.getItem("user")!).id;

  const companyMutation = useApiMutation<
    any,
    { companyName: string; jobId: string; _id: string }
  >({
    url: "http://localhost:5000/company",
    method: "POST",
    options: {
      onSuccess: (data) => {
        localStorage.setItem("company", JSON.stringify(data));
        navigate("/add-new-service");
      },
      onError: (error: any) => {
        setError(error.message);
      },
    },
  });

  const jobs = useApiQuery({
    key: "jobs",
    url: "http://localhost:5000/jobs",
  }).data;

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      _id: userId,
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
        <p className="subtitle">ساخت اکانت شرکتی</p>

        <motion.form
          className="company-form"
          onSubmit={handleAddCompany}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="نام شرکت"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
          />

          <select
            value={formData.jobId}
            onChange={(e) =>
              setFormData({ ...formData, jobId: e.target.value })
            }
          >
            <option value="">یک شغل انتخاب کنید</option>
            {Array.isArray(jobs) &&
              jobs.map((item: any) => (
                <option key={item.jobCode} value={item.jobCode}>
                  {item.name}
                </option>
              ))}
          </select>

          {error && <span className="error">{error}</span>}

          <ButtonUI variant={VariantType.SECONDARY} type={buttonType.SUBMIT}>
            ایجاد حساب{" "}
          </ButtonUI>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AddNewCompany;
