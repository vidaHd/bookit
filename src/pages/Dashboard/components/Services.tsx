import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface ServiceItem {
  id: string;
  name: string;
  price?: string; // show dashed if missing
  duration?: string;
}

const Services: React.FC = () => {
  const { t } = useTranslation();
  const initial = useMemo<ServiceItem[]>(() => {
    try {
      const raw = localStorage.getItem("service");
      const svc = raw ? JSON.parse(raw) : null;
      const base: ServiceItem[] = [];
      if (svc && svc.title && svc._id) {
        base.push({ id: svc._id, name: svc.title });
      }
      const samples: ServiceItem[] = [
        { id: "sample-1", name: t("dashboard.services.sample_a"), price: "150,000", duration: "30" },
        { id: "sample-2", name: t("dashboard.services.sample_b"), price: "300,000", duration: "90" },
        { id: "sample-3", name: t("dashboard.services.sample_c") },
        { id: "sample-4", name: "Service 4" },
        { id: "sample-5", name: "Service 5" },
        { id: "sample-6", name: "Service 6" },
        { id: "sample-7", name: "Service 7" },
        { id: "sample-8", name: "Service 8" },
        { id: "sample-9", name: "Service 9" },
        { id: "sample-10", name: "Service 10" },
      ];
      return [...base, ...samples].slice(0, 10);
    } catch {}
    return [
      { id: "sample-1", name: t("dashboard.services.sample_a"), price: "150,000", duration: "30" },
      { id: "sample-2", name: t("dashboard.services.sample_b"), price: "300,000", duration: "90" },
      { id: "sample-3", name: t("dashboard.services.sample_c") },
      { id: "sample-4", name: "Service 4" },
      { id: "sample-5", name: "Service 5" },
      { id: "sample-6", name: "Service 6" },
      { id: "sample-7", name: "Service 7" },
      { id: "sample-8", name: "Service 8" },
      { id: "sample-9", name: "Service 9" },
      { id: "sample-10", name: "Service 10" },
    ];
  }, [t]);

  const [services, setServices] = useState<ServiceItem[]>(initial);
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDuration, setNewDuration] = useState("");

  const openEdit = (item: ServiceItem) => {
    console.log(item)
    if (editing?.id === item.id) {
      setEditing(null);
    } else {
      setEditing(item);
    }
  };
  const closeEdit = () => setEditing(null);

  const saveEdit = () => {
    if (!editing) return;
    setServices((prev) => prev.map((s) => (s.id === editing.id ? editing : s)));
    closeEdit();
  };

  const openAdd = () => {
    setNewName("");
    setNewPrice("");
    setNewDuration("");
    setIsAddOpen(true);
  };

  const closeAdd = () => setIsAddOpen(false);

  const saveNew = () => {
    if (!newName.trim()) return;
    const newItem: ServiceItem = {
      id: `svc-${Date.now()}`,
      name: newName.trim(),
      price: newPrice.trim() || undefined,
      duration: newDuration.trim() || undefined,
    };
    setServices((prev) => [newItem, ...prev]);
    setIsAddOpen(false);
  };

  return (
    <div className="dashboard-services">
      <div className="section-header">
        <h2>{t("dashboard.services.title")}</h2>
        <p>{t("dashboard.services.subtitle")}</p>
      </div>

      <div className="services-list">
        <div className="add-service-form" style={{ display: "flex", justifyContent: "flex-end", marginBottom: "var(--space-6)" }}>
          <button className="btn" onClick={openAdd} type="button">{t("dashboard.services.add_new")}</button>
        </div>
        <div className="services-grid">
          {services.length === 0 ? (
            <p className="empty">{t("dashboard.services.empty")}</p>
          ) : (
            services.map((s) => (
              <div key={s.id} className="service-card">
                <div className="service-header">
                  <h4 style={{color:"#fff"}}>{s.name}</h4>
                  <button className="link"  onClick={() => openEdit(s)} >
                    {t("dashboard.common.edit")}
                  </button>
                </div>

                {editing?.id ==s.id && (
                  <div className="inline-edit">
                    <label>{t("dashboard.services.price")}</label>
                    <input
                      value={editing.price || ""}
                      onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                      placeholder={t("dashboard.services.price_ph")}
                    />
                    <label>{t("dashboard.services.duration")}</label>
                    <input
                      value={editing.duration || ""}
                      onChange={(e) => setEditing({ ...editing, duration: e.target.value })}
                      placeholder={t("dashboard.services.duration_ph")}
                    />
                    <div className="edit-actions">
                      <button className="btn" onClick={saveEdit}>{t("dashboard.common.save")}</button>
                      <button className="btn secondary" onClick={closeEdit}>{t("dashboard.common.cancel")}</button>
                    </div>
                  </div>
                )}

                <div className="service-details">
                  <p>
                    <strong>{t("dashboard.services.price")}:</strong> {s.price || "—"}
                  </p>
                  <p>
                    <strong>{t("dashboard.services.duration")}:</strong> {s.duration || "—"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isAddOpen && (
        <div className="modal-backdrop" onClick={closeAdd}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{t("dashboard.services.add_title") || "سرویس جدید"}</h3>
            <label>{t("dashboard.services.name") || "نام سرویس"}</label>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={t("dashboard.services.name_ph") || "مثلاً: کوتاهی مو"} />
            <label>{t("dashboard.services.price") || "قیمت"}</label>
            <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder={t("dashboard.services.price_ph") || "مثلاً: 150,000"} />
            <label>{t("dashboard.services.duration") || "مدت زمان (دقیقه)"}</label>
            <input value={newDuration} onChange={(e) => setNewDuration(e.target.value)} placeholder={t("dashboard.services.duration_ph") || "مثلاً: 30"} />
            <div className="modal-actions">
              <button className="btn" onClick={saveNew} type="button">{t("dashboard.common.save")}</button>
              <button className="btn secondary" onClick={closeAdd} type="button">{t("dashboard.common.cancel")}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
