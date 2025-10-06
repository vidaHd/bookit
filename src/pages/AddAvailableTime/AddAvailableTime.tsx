import React, { useState } from "react";
import "./AddAvailableTime.scss";

const WEEK_DAYS = [
  { key: "saturday", label: "شنبه" },
  { key: "sunday", label: "یک‌شنبه" },
  { key: "monday", label: "دوشنبه" },
  { key: "tuesday", label: "سه‌شنبه" },
  { key: "wednesday", label: "چهارشنبه" },
  { key: "thursday", label: "پنج‌شنبه" },
  { key: "friday", label: "جمعه" },
];

// تولید بازه‌های زمانی از 00:00 تا 23:00 هر یک ساعت
const generateTimeSlots = () => {
  const slots = [];
  for (let h = 0; h < 24; h++) {
    const start = h.toString().padStart(2, "0") + ":00";
    slots.push(start);
  }
  return slots;
};

const AvailableTimeForm: React.FC = () => {
  const [selectedTimes, setSelectedTimes] = useState<{ [day: string]: string[] }>({});

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

  const handleSubmit = () => {
    console.log("Selected times:", selectedTimes);
    alert("زمان‌های انتخاب‌شده در کنسول نمایش داده شدند ✅");
  };

  const timeSlots = generateTimeSlots();

  return (
     <div className="container">
    <div className="time-page">
      <div className="available-container">
        <h2>تنظیم زمان‌های در دسترس</h2>
        <div className="time-grid">
          {WEEK_DAYS.map((day) => (
            <div key={day.key} className="day-column">
              <div className="day-header">{day.label}</div>
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={`time-slot ${
                    selectedTimes[day.key]?.includes(time) ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(day.key, time)}
                >
                  {time}
                </button>
              ))}
            </div>
          ))}
        </div>

        <button className="save-btn" onClick={handleSubmit}>
          ذخیره زمان‌ها
        </button>
      </div>
    </div>
    </div>
  );
};

export default AvailableTimeForm;
