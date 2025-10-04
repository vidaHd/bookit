import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddedService.scss";
import { ButtonUI } from "../../ui-kit";
import { buttonType, VariantType } from "../../ui-kit/button/button.type";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/LanguageContext";
import { useApiMutation, useApiQuery } from "../../api/apiClient";

const AddedService = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useAppContext();

  const [formData, setFormData] = useState({ title: "" });
  const [error, setError] = useState("");

  const userId = JSON.parse(localStorage.getItem("user")!).id;
  const company = localStorage.getItem("company");

  // لیست سرویس‌ها از بک‌اند
  const services = useApiQuery({
    key: "all-service",
    url: `http://localhost:5000/all-service/${
      company ? JSON.parse(company).jobId : ""
    }`,
  }).data;

  // state برای نگه‌داشتن سرویس‌های انتخاب شده
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id],
    );
  };

  const companyMutation = useApiMutation<
    any,
    {
      title: string;
      jobId?: string;
      companyId?: string;
      selectedServices?: string[];
    }
  >({
    url: "http://localhost:5000/service",
    method: "POST",
    options: {
      onSuccess: (data) => {
        localStorage.setItem("service", JSON.stringify(data));
        navigate("/add-user-service");
      },
      onError: (error: any) => {
        setError(error.message);
      },
    },
  });

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      companyId: company ? JSON.parse(company)._id : "",
      jobId: company ? JSON.parse(company).jobId : "",
      selectedServices,
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

        <h3 className="subtitle">سرویس‌های موجود</h3>

        {Array.isArray(services) && services.length > 0 ? (
          <div className="services-list">
            {services.map((item: any) => (
              <label key={item._id} className="service-item">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(item._id)}
                  onChange={() => handleCheckboxChange(item._id)}
                />
                <span>{item.title}</span>
              </label>
            ))}
          </div>
        ) : (
          <p>هیچ سرویسی یافت نشد</p>
        )}

        <h3 className="subtitle">ساخت سرویس جدید</h3>

        <motion.form
          className="company-form"
          onSubmit={handleAddCompany}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="نام سرویس"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          {error && <span className="error">{error}</span>}

          <ButtonUI variant={VariantType.SECONDARY} type={buttonType.SUBMIT}>
            ایجاد سرویس
          </ButtonUI>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AddedService;
