import React, { useState } from "react";
import { motion } from "framer-motion";
import "./reserveTime.scss";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const times = ["09:00", "11:00", "13:00", "15:00", "17:00"];

const Booking = () => {
  const [selected, setSelected] = useState<{
    day: string;
    time: string;
  } | null>(null);

  const handleSelect = (day: string, time: string) => {
    setSelected({ day, time });
  };

  return (
    <>
      <div className="booking-page">
        <h1>Booking Schedule</h1>

        <motion.div
          className="booking-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {days.map((day) => (
            <div key={day} className="day-column">
              <h2>{day}</h2>
              {times.map((time) => (
                <motion.button
                  key={time}
                  className={`time-slot ${selected?.day === day && selected?.time === time ? "selected" : ""}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(day, time)}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          ))}
        </motion.div>
        {selected && (
          <motion.div
            className="selected-info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Selected: {selected.day} at {selected.time}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Booking;
