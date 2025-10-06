import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./AddAvailableTime.scss";
import { useApiMutation, useApiQuery } from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

const WEEK_DAY_KEYS = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
] as const;

const generateTimeSlots = () => {
  const slots = [];
  for (let h = 0; h < 24; h++) {
    const start = h.toString().padStart(2, "0") + ":00";
    slots.push(start);
  }
  return slots;
};

const AvailableTimeForm: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTimes, setSelectedTimes] = useState<{ [day: string]: string[] }>({});
  const [originalTimes, setOriginalTimes] = useState<{ [day: string]: string[] }>({});
  const company = localStorage.getItem("company");
  const companyId = company ? JSON.parse(company)._id : "";
  const navigate = useNavigate();

  // const { data: fetchedTimes, refetch } = useApiQuery({
  //   key: ["availableTime", companyId],
  //   url: `http://localhost:5000/availableTime/${companyId}`,
  //   method: "GET",
  // });

  // useEffect(() => {
    // if (fetchedTimes) {
      // setSelectedTimes(fetchedTimes);
      // setOriginalTimes(fetchedTimes);
    // }
  // }, [fetchedTimes]);

  // --- Mutation to add/update available times ---
  const addAvailableTimeMutation = useApiMutation<
    any,
    { companyId: string; day: string; times: string[] }
  >({
    url: "http://localhost:5000/availableTime",
    method: "POST",
    options: {
      onSuccess: () => {
        // refetch();
        navigate('/dashboard');
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    },
  });

  const handleSelect = (day: string, time: string) => {
    setSelectedTimes((prev) => {
      const current = prev[day] || [];
      const isSelected = current.includes(time);
      return {
        ...prev,
        [day]: isSelected
          ? current.filter((t) => t !== time)
          : [...current, time],
      };
    });
  };

  const handleSubmit = async () => {
    for (const day of Object.keys(selectedTimes)) {
      const newTimes = selectedTimes[day];
      const oldTimes = originalTimes[day] || [];

      const hasChanged =
        newTimes.length !== oldTimes.length ||
        newTimes.some((t) => !oldTimes.includes(t));

      if (hasChanged) {
        await addAvailableTimeMutation.mutateAsync({
          companyId,
          day,
          times: newTimes,
        });
      }
    }

  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="add-available-page">
      <div className="container">
        <div className="available-card">
          <div className="available-header">
            <div className="available-title">
              <h2>{t("available-time.title")}</h2>
              <p>{t("available-time.subtitle")}</p>
            </div>
          </div>

          <div className="time-grid">
            {WEEK_DAY_KEYS.map((dayKey) => (
              <div key={dayKey} className="day-column">
                <div className="day-header">
                  {t(`available-time.weekdays.${dayKey}`)}
                </div>
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    className={`time-slot ${
                      selectedTimes[dayKey]?.includes(time) ? "selected" : ""
                    }`}
                    onClick={() => handleSelect(dayKey, time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="actions">
            <button className="save-btn" onClick={handleSubmit}>
              {t("available-time.save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableTimeForm;
