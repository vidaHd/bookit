import React from "react";
import { useTranslation } from "react-i18next";

const Bookings: React.FC = () => {
  const { t } = useTranslation();
  const rows = [
    { id: 1, customer: "احمد محمدی", service: t("dashboard.services.sample_a"), date: "1403/02/10", time: "14:30", price: "150,000", status: "confirmed" },
    { id: 2, customer: "فاطمه احمدی", service: t("dashboard.services.sample_b"), date: "1403/02/11", time: "10:00", price: "300,000", status: "pending" },
    { id: 3, customer: "علی رضایی", service: t("dashboard.services.sample_c"), date: "1403/02/12", time: "16:00", price: "80,000", status: "completed" },
    { id: 4, customer: "Sara K.", service: t("dashboard.services.sample_a"), date: "2025/10/06", time: "11:15", price: "150,000", status: "pending" },
    { id: 5, customer: "Reza M.", service: t("dashboard.services.sample_b"), date: "2025/10/07", time: "09:45", price: "300,000", status: "confirmed" },
  ];
  return (
    <div className="dashboard-bookings">
      <div className="section-header">
        <h2>{t("dashboard.bookings.title")}</h2>
        <p>{t("dashboard.bookings.subtitle")}</p>
      </div>
      <div className="bookings-table">
        <div className="table-header">
          <div>{t("dashboard.bookings.customer")}</div>
          <div>{t("dashboard.bookings.service")}</div>
          <div>{t("dashboard.bookings.date")}</div>
          <div>{t("dashboard.bookings.time")}</div>
          <div>{t("dashboard.bookings.price")}</div>
          <div>{t("dashboard.bookings.status")}</div>
        </div>
        {rows.map((r) => (
          <div key={r.id} className="table-row">
            <div>{r.customer}</div>
            <div>{r.service}</div>
            <div>{r.date}</div>
            <div>{r.time}</div>
            <div>{r.price}</div>
            <div>{t(`dashboard.bookings.status_${r.status}`)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
