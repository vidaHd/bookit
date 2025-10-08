import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./reserveTime.scss";

interface Reservation {
  day: string;
  times: string[];
}

interface Selected {
  day: string;
  time: string;
}

const Booking = () => {
  const [selected, setSelected] = useState<Selected | null>(null);
  const [reservedTimes, setReservedTimes] = useState<Reservation[]>([]);

  const company = localStorage.getItem("company");
  const companyId = company ? JSON.parse(company)._id : "";

  useEffect(() => {
    const fetchReservedTimes = async () => {
      if (!companyId) return;

      try {
        const res = await fetch(`http://localhost:5000/all-time/${companyId}`);
        if (!res.ok) throw new Error("Failed to fetch reservations");
        const data = await res.json();

        setReservedTimes(data);
      } catch (err) {
        console.error("Error fetching reserved times:", err);
      }
    };

    fetchReservedTimes();
  }, [companyId]);

  const handleSelect = (day: string, time: string) => {
    setSelected({ day, time });
  };

  return (
    <div className="booking-page">
      <h1>Booking Schedule</h1>

      <motion.div
        className="booking-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {reservedTimes?.map((dayItem) => (
          <div key={dayItem.day} className="day-column">
            <h2>{dayItem.day}</h2>
            {dayItem.times.map((time) => (
              <motion.button
                key={time}
                className={`time-slot ${
                  selected?.day === dayItem.day && selected?.time === time
                    ? "selected"
                    : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(dayItem.day, time)}
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
  );
};

export default Booking;
