import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApiMutation, useApiQuery } from "../../../api/apiClient";
import AddNewService from "./AddNewService";

interface ServiceItem {
  serviceId: string;
  companyId: string;
  title: string;
  price?: string;
  duration?: string;
}

const Services: React.FC = () => {
  const { t } = useTranslation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    price: string;
    duration: string;
  }>({
    price: "",
    duration: "",
  });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState("");

  const company = localStorage.getItem("company");
  const companyId = company ? JSON.parse(company)._id : "";

  const { data: servicesData, refetch } = useApiQuery({
    key: ["all-service", companyId],
    url: `http://localhost:5000/user-service/${companyId}`,
  });

  const updateService = useApiMutation<
    any,
    { serviceId: string; companyId: string; price: string; duration: string }
  >({
    url: `http://localhost:5000/update-service/${companyId}`,
    method: "PUT",
    options: {
      onSuccess: () => {
        setEditingId(null);
        refetch();
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    },
  });
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
        console.log(data);
        refetch();
      },
    },
  });

  const openEdit = (item: ServiceItem) => {
    if (editingId === item.serviceId) {
      setEditingId(null);
    } else {
      setEditingId(item.serviceId);
      setEditValues({
        price: item.price && item.price !== "-" ? item.price : "",
        duration: item.duration && item.duration !== "-" ? item.duration : "",
      });
    }
  };

  const saveEdit = (item: ServiceItem) => {
    updateService.mutate({
      serviceId: item.serviceId,
      companyId: item.companyId,
      price: editValues.price || "-",
      duration: editValues.duration || "-",
    });
  };

  const openAdd = () => {
    setNewName("");
    setIsAddOpen(true);
  };

  const closeAdd = () => setIsAddOpen(false);

  const saveNew = () => {
    const payload = {
      title: newName.trim(),
      jobId: company ? JSON.parse(company).jobId : "",
      companyId: company ? JSON.parse(company)._id : "",
    };

    createServiceMutation.mutate(payload);
  };
  console.log(servicesData);

  return (
    <div className="dashboard-services">
      <div className="section-header">
        <h2>{t("dashboard.services.title")}</h2>
        <p>{t("dashboard.services.subtitle")}</p>
      </div>

      <div className="services-list">
        <div
          className="add-service-form"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "var(--space-6)",
          }}
        >
          <button className="btn" onClick={openAdd} type="button">
            {t("dashboard.services.add_new")}
          </button>
        </div>

        <div className="services-grid">
          {Array.isArray(servicesData) && servicesData.length === 0 ? (
            <p className="empty">{t("dashboard.services.empty")}</p>
          ) : (
            Array.isArray(servicesData) &&
            servicesData.map((s: ServiceItem) => {
              const isEditing = editingId === s.serviceId;

              return (
                <div key={s.serviceId} className="service-card">
                  <div className="service-header">
                    <p style={{ color: "#fff" }}>{s.title}</p>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => openEdit(s)}
                    >
                      {isEditing
                        ? t("dashboard.common.cancel")
                        : t("dashboard.common.edit")}
                    </span>
                  </div>

                  {isEditing ? (
                    <div className="inline-edit">
                      <label>{t("dashboard.services.price")}</label>
                      <input
                        value={editValues.price}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        }
                        placeholder={t("dashboard.services.price_ph")}
                      />
                      <label>{t("dashboard.services.duration")}</label>
                      <input
                        value={editValues.duration}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            duration: e.target.value,
                          }))
                        }
                        placeholder={t("dashboard.services.duration_ph")}
                      />
                      <div className="edit-actions">
                        <button className="btn" onClick={() => saveEdit(s)}>
                          {t("dashboard.common.save")}
                        </button>
                        <button
                          className="btn secondary"
                          onClick={() => setEditingId(null)}
                        >
                          {t("dashboard.common.cancel")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="service-details">
                      <p>
                        <strong>{t("dashboard.services.price")}:</strong>{" "}
                        {s.price || "—"}
                      </p>
                      <p>
                        <strong>{t("dashboard.services.duration")}:</strong>{" "}
                        {s.duration || "—"}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {isAddOpen && (
        <div className="modal-backdrop" onClick={closeAdd}>
          <div className="" onClick={(e) => e.stopPropagation()}>
            <AddNewService
              onclose={closeAdd}
              refetch={refetch}
              selectedService={servicesData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
