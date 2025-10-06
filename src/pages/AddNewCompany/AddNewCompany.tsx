import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ButtonUI, InputUI } from "../../ui-kit";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/LanguageContext";
import { useApiMutation, useApiQuery } from "../../api/apiClient";
import "./AddNewCompany.scss";
import { buttonType, VariantType } from "../../ui-kit/button/button.type";

const AddNewCompany: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useAppContext();

  const [formData, setFormData] = useState({
    companyName: "",
    jobId: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
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
        setErrors({ general: error.message });
      },
    },
  });

  const { data: jobs, isLoading: jobsLoading } = useApiQuery({
    key: "jobs",
    url: "http://localhost:5000/jobs",
  });

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "نام شرکت الزامی است";
    }

    if (!formData.jobId.trim()) {
      newErrors.jobId = "انتخاب شغل الزامی است";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    const finalData = {
      ...formData,
      _id: userId,
    };

    companyMutation.mutate(finalData);
    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="add-company-page">
      <div className="container">
        <motion.div
          className="company-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="company-header">
            <ButtonUI variant={VariantType.ICON} onClick={() => navigate("/")}>
              {t("add-new-company.back")}
            </ButtonUI>

            <div className="company-title">
              <h1>{t("add-new-company.create_company_account")}</h1>
              <p>{t("add-new-company.enter_company_info")}</p>
            </div>
          </div>

          {/* Form */}
          <motion.form
            className="company-form"
            onSubmit={handleAddCompany}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="form-grid">
              <input
                className="input-new-company"
                type="text"
                placeholder={t("add-new-company.company_name_placeholder")}
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
              />

              <div className="form-group">
                <label className="input-label required">
                  {t("add-new-company.job_label")}
                </label>
                <div className="select-wrapper">
                  <select
                    value={formData.jobId}
                    onChange={(e) => handleInputChange("jobId", e.target.value)}
                    className={`input ${errors.jobId ? "error" : ""}`}
                    disabled={jobsLoading}
                  >
                    <option value="">
                      {jobsLoading
                        ? t("add-new-company.loading jobs")
                        : t("add-new-company.select_job")}
                    </option>
                    {Array.isArray(jobs) &&
                      jobs.map((item: any) => (
                        <option key={item.jobCode} value={item.jobCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>

                  {errors && <span className="error">{errors.general}</span>}

                  <div className="select-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </div>
                {errors.jobId && (
                  <div className="input-error">{errors.jobId}</div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <ButtonUI
                variant={VariantType.PRIMARY}
                onClick={() => navigate("/")}
                type={buttonType.BUTTON}
              >
                {t("add-new-company.cancel")}
              </ButtonUI>

              <ButtonUI
                variant={VariantType.SECONDARY}
                type={buttonType.SUBMIT}
              >
                {t("add-new-company.create")}
              </ButtonUI>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddNewCompany;
