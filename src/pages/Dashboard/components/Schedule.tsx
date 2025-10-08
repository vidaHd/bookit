import React, {  } from "react";
import { useTranslation } from "react-i18next";
import AvailableTimeForm from "../../AddAvailableTime/AddAvailableTime";

const Schedule: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="dashboard-schedule">
      <div className="section-header">
        <h2>{t("dashboard.schedule.title")}</h2>
        <p>{t("dashboard.schedule.subtitle")}</p>
      </div>

      <AvailableTimeForm />
    </div>
  );
};

export default Schedule;
