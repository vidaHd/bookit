import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const Schedule: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTimes, setSelectedTimes] = useState<{ [day: string]: string[] }>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem("availableTimes");
      if (raw) setSelectedTimes(JSON.parse(raw));
    } catch {}
  }, []);

  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    for (let h = 0; h < 24; h++) {
      slots.push(h.toString().padStart(2, "0") + ":00");
    }
    return slots;
  }, []);

  const handleSelect = (day: string, time: string) => {
    setSelectedTimes((prev) => {
      const current = prev[day] || [];
      const isSelected = current.includes(time);
      return {
        ...prev,
        [day]: isSelected ? current.filter((t) => t !== time) : [...current, time],
      };
    });
  };

  const handleSave = () => {
    localStorage.setItem("availableTimes", JSON.stringify(selectedTimes));
  };

  const weekdayKeys = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];

  return (
    <div className="dashboard-schedule">
      <div className="section-header">
        <h2>{t("dashboard.schedule.title")}</h2>
        <p>{t("dashboard.schedule.subtitle")}</p>
      </div>

      <div className="time-grid">
        {weekdayKeys.map((key) => (
          <div key={key} className="day-column">
            <div className="day-header">{t(`available-time.weekdays.${key}`)}</div>
            {timeSlots.map((time) => (
              <button
                key={time}
                className={`time-slot ${selectedTimes[key]?.includes(time) ? "selected" : ""}`}
                onClick={() => handleSelect(key, time)}
              >
                {time}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="actions">
        <button className="save-btn" onClick={handleSave}>{t("dashboard.schedule.save")}</button>
      </div>
    </div>
  );
};

export default Schedule;
