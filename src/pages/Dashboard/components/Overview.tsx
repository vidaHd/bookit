import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

const Overview: React.FC = () => {
  const { t } = useTranslation();

  const availableTimes = useMemo(() => {
    try {
      const raw = localStorage.getItem("availableTimes");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }, []);

  const workingHoursText = useMemo(() => {
    const entries: string[] = [];
    Object.keys(availableTimes || {}).forEach((dayKey) => {
      const times: string[] = availableTimes[dayKey] || [];
      if (times.length > 0) {
        const first = times[0];
        const last = times[times.length - 1];
        entries.push(`${t(`available-time.weekdays.${dayKey}`)} ${first} - ${last}`);
      }
    });
    return entries.length > 0 ? entries.join(" | ") : t("dashboard.overview.no_hours");
  }, [availableTimes, t]);

  return (
    <div className="dashboard-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <h3>{t("dashboard.overview.today_bookings")}</h3>
            <p className="stat-number">12</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3>{t("dashboard.overview.active_services")}</h3>
            <p className="stat-number">8</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3>{t("dashboard.overview.working_hours")}</h3>
            <p className="stat-number">{24}</p>
          </div>
        </div>
      </div>

      <div className="recent-bookings">
        <h2>{t("dashboard.bookings.title")}</h2>
        <div className="bookings-list">
          {[
            { id: 1, customer: "احمد محمدی", service: t("dashboard.services.sample_a"), date: "1403/02/10", time: "14:30", price: "-", status: "confirmed" },
            { id: 2, customer: "فاطمه احمدی", service: t("dashboard.services.sample_b"), date: "1403/02/11", time: "10:00", price: "-", status: "pending" },
            { id: 3, customer: "علی رضایی", service: t("dashboard.services.sample_c"), date: "1403/02/12", time: "16:00", price: "-", status: "completed" },
          ].map((b) => (
            <div key={b.id} className="booking-item">
              <div className="booking-info">
                <h4>{b.customer}</h4>
                <p>{b.service}</p>
                <span className="booking-time">{b.date} - {b.time}</span>
              </div>
              <div className="booking-status">
                <span className={`status-badge status-${b.status}`}>
                  {b.status === "confirmed" && t("dashboard.bookings.status_confirmed")}
                  {b.status === "pending" && t("dashboard.bookings.status_pending")}
                  {b.status === "completed" && t("dashboard.bookings.status_completed")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
