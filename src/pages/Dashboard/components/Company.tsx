import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonUI } from "../../../ui-kit";
import { buttonType, VariantType } from "../../../ui-kit/button/button.type";

interface CompanyData {
  name: string;
  phone?: string;
  address?: string;
  email?: string;
  description?: string;
}

const Company: React.FC = () => {
  const { t } = useTranslation();
  const initial = useMemo<CompanyData>(() => {
    try {
      const raw = localStorage.getItem("company");
      const c = raw ? JSON.parse(raw) : null;
      if (c && c.companyName) return { name: c.companyName };
    } catch {}
    return { name: "" };
  }, []);

  const [form, setForm] = useState<CompanyData>(initial);

  const save = () => {
    const raw = localStorage.getItem("company");
    try {
      const c = raw ? JSON.parse(raw) : {};
      const next = { ...c, companyName: form.name };
      localStorage.setItem("company", JSON.stringify(next));
    } catch {}
  };

  return (
    <div className="dashboard-company">
      <div className="section-header">
        <h2>{t("dashboard.company.title")}</h2>
        <p>{t("dashboard.company.subtitle")}</p>
      </div>

      <div className="company-form">
        <label>{t("dashboard.company.name")}</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder={t("dashboard.company.name_ph")}
        />
        <label>{t("dashboard.company.phone")}</label>
        <input
          value={form.phone || ""}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder={t("dashboard.company.phone_ph")}
        />
        <label>{t("dashboard.company.address")}</label>
        <input
          value={form.address || ""}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          placeholder={t("dashboard.company.address_ph")}
        />
        <label>{t("dashboard.company.email")}</label>
        <input
          value={form.email || ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder={t("dashboard.company.email_ph")}
        />
        <label>{t("dashboard.company.description")}</label>
        <input
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder={t("dashboard.company.description_ph")}
        />
        <div className="actions">
          <ButtonUI variant={VariantType.SECONDARY} type={buttonType.BUTTON} onClick={save}>{t("dashboard.common.save")}</ButtonUI>
        </div>
      </div>
    </div>
  );
};

export default Company;
