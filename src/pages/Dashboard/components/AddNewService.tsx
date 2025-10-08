import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApiMutation, useApiQuery } from "../../../api/apiClient";
import { ButtonUI } from "../../../ui-kit";
import { buttonType, VariantType } from "../../../ui-kit/button/button.type";

const AddNewService = ({
  onclose,
  refetch,
  selectedService,
}: {
  onclose: () => void;
  refetch: () => void;
  selectedService: any;
}): any => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({ title: "" });
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const company = localStorage.getItem("company");

  const { data: servicesData, isLoading: servicesLoading } = useApiQuery({
    key: ["all-service", company ? JSON.parse(company).jobId : ""],
    url: `http://localhost:5000/all-service/${
      company ? JSON.parse(company).jobId : ""
    }`,
  });

  console.log(servicesData, "servicesData");

  const [servicesList, setServicesList] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(servicesData)) {
      setServicesList(servicesData);
    }
  }, [servicesData]);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  useEffect(() => {
    if (selectedService) {
      const ids = Array.isArray(selectedService)
        ? selectedService
        : [selectedService];
      setSelectedServices(ids);
    }
  }, [selectedService]);

  const handleCheckboxChange = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id],
    );
  };

  useEffect(() => {
    if (Array.isArray(selectedService) && selectedService.length > 0) {
      const ids = selectedService.map((s) => s.serviceId);
      setSelectedServices(ids);
    }
  }, [selectedService]);

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

  const companyId = company ? JSON.parse(company)._id : "";

  const selectServicesMutation = useApiMutation<
    any,
    {
      companyId: string;
      serviceIds: string[];
    }
  >({
    url: `http://localhost:5000/user-service/bulk/${companyId}`,
    method: "PUT",
    options: {
      onSuccess: (data) => {
        const firstSelected = selectedServices[0];
        const matched =
          servicesList.find((s) => s._id === firstSelected) || data;
        if (matched) {
          localStorage.setItem("service", JSON.stringify(matched));
        }
        refetch();
        onclose();
      },
      onError: (error: any) => {
        setError(error.message);
      },
    },
  });
  console.log(selectedServices);

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
    const payload = {
      companyId: company ? JSON.parse(company)._id : "",
      serviceIds: selectedServices,
    };
    selectServicesMutation.mutate(payload);
  };

  const filteredServices = useMemo(() => {
    if (!search.trim()) return servicesList;
    const q = search.trim().toLowerCase();
    return servicesList.filter((s) =>
      (s.title || "").toLowerCase().includes(q),
    );
  }, [servicesList, search]);

  return (
    <div className="">
      <div className="container">
        <motion.div
          className="service-card"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="service-header"></div>

          <div className="services-section">
            <div className="services-list" aria-busy={servicesLoading}>
              {filteredServices && filteredServices.length > 0 ? (
                filteredServices.map((item: any) => {
                  const isSelected =
                    selectedServices.includes(item._id) ||
                    selectedService?.some((s: any) => s.serviceId === item._id);
                  return (
                    <button
                      key={item._id}
                      type="button"
                      className={`service-item ${isSelected ? "selected" : ""}`}
                      onClick={() =>
                        !isSelected && handleCheckboxChange(item._id)
                      }
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
                  {t("added-service.cancel_and_close")}
                </ButtonUI>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddNewService;
