import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
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
  const [search, setSearch] = useState("");

  const userId = JSON.parse(localStorage.getItem("user")!).id;
  const company = localStorage.getItem("company");

  const { data: servicesData, isLoading: servicesLoading } = useApiQuery({
    key: ["all-service", company ? JSON.parse(company).jobId : ""],
    url: `http://localhost:5000/all-service/${
      company ? JSON.parse(company).jobId : ""
    }`,
  });

  const [servicesList, setServicesList] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(servicesData)) {
      setServicesList(servicesData);
    }
  }, [servicesData]);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id],
    );
  };

  // Create new service
  const createServiceMutation = useApiMutation<
    any,
    {
      title: string;
      jobId?: string;
      companyId?: string;
    }
  >({
    url: "http://localhost:5000/service",
    method: "POST",
    options: {
      onSuccess: (data) => {
        if (data && data._id) {
          setServicesList((prev) => [{ ...data }, ...prev]);
          setSelectedServices((prev) =>
            prev.includes(data._id) ? prev : [data._id, ...prev],
          );
          setFormData({ title: "" });
        }
      },
      onError: (error: any) => {
        setError(error.message);
      },
    },
  });

  // Associate selected services and proceed
  const associateServicesMutation = useApiMutation<
    any,
    {
      title?: string;
      jobId?: string;
      companyId?: string;
      selectedServices?: string[];
    }
  >({
    url: "http://localhost:5000/service",
    method: "POST",
    options: {
      onSuccess: (data) => {
        const firstSelected = selectedServices[0];
        const matched =
          servicesList.find((s) => s._id === firstSelected) || data;
        if (matched) {
          localStorage.setItem("service", JSON.stringify(matched));
        }
        navigate("/available-time");
      },
      onError: (error: any) => {
        setError(error.message);
      },
    },
  });

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    const payload = {
      title: formData.title.trim(),
      companyId: company ? JSON.parse(company)._id : "",
      jobId: company ? JSON.parse(company).jobId : "",
    };
    createServiceMutation.mutate(payload);
  };

  const handleNext = () => {
    if (selectedServices.length === 0) return;
    // const payload = {
    //   companyId: company ? JSON.parse(company)._id : "",
    //   jobId: company ? JSON.parse(company).jobId : "",
    //   selectedServices,
    // };
    // associateServicesMutation.mutate(payload);
    navigate("/available-time");
  };

  const filteredServices = useMemo(() => {
    if (!search.trim()) return servicesList;
    const q = search.trim().toLowerCase();
    return servicesList.filter((s) =>
      (s.title || "").toLowerCase().includes(q),
    );
  }, [servicesList, search]);

  return (
    <div className="add-service-page">
      <div className="container">
        <motion.div
          className="service-card"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="service-header">
            <ButtonUI
              variant={VariantType.ICON}
              type={buttonType.BUTTON}
              onClick={() => navigate(-1)}
            >
              {t("add-new-company.back")}
            </ButtonUI>
            
            <div className="service-title">
              <h1>{t("added-service.title")}</h1>
              <p>{t("added-service.subtitle")}</p>
            </div>
          </div>

          <div className="services-section">
            <div className="services-header">
              <h3>{t("added-service.existing_services")}</h3>
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder={t("added-service.search_placeholder")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="services-list" aria-busy={servicesLoading}>
              {filteredServices && filteredServices.length > 0 ? (
                filteredServices.map((item: any) => {
                  const isSelected = selectedServices.includes(item._id);
                  return (
                    <button
                      key={item._id}
                      type="button"
                      className={`service-item ${isSelected ? "selected" : ""}`}
                      onClick={() => handleCheckboxChange(item._id)}
                      aria-pressed={isSelected}
                    >
                      <span className="title">{item.title}</span>
                    </button>
                  );
                })
              ) : (
                <p className="empty">{t("added-service.no_services")}</p>
              )}
            </div>

            <div className="services-footer">
              <span className="selected-count">
                {t("added-service.selected_count", {
                  count: selectedServices.length,
                })}
              </span>
            </div>
          </div>

          <div className="create-service">
            <h3>{t("added-service.create_new_service")}</h3>

            <motion.form
              className="service-form"
              onSubmit={handleCreateService}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <input
                type="text"
                placeholder={t("added-service.service_name_placeholder")}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              {error && <span className="form-error">{error}</span>}

              <div className="form-actions">
                <ButtonUI
                  variant={VariantType.PRIMARY}
                  type={buttonType.SUBMIT}
                >
                  {t("added-service.add_service")}
                </ButtonUI>
                <ButtonUI
                  variant={VariantType.SECONDARY}
                  type={buttonType.BUTTON}
                  onClick={handleNext}
                  disabled={selectedServices.length === 0}
                >
                  {t("added-service.next_step")}
                </ButtonUI>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddedService;
