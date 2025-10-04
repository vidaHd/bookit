import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { motion, AnimatePresence } from "framer-motion";
import { formatISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./AddAvailableTime.scss";
import { buttonType, VariantType } from "../../ui-kit/button/button.type";
import { ButtonUI } from "../../ui-kit";

type TimeRange = {
  start: Date | null;
  end: Date | null;
  id: string;
};

const WEEK_DAYS = [
  { key: "sunday", label: "یکشنبه" },
  { key: "monday", label: "دوشنبه" },
  { key: "tuesday", label: "سه‌شنبه" },
  { key: "wednesday", label: "چهارشنبه" },
  { key: "thursday", label: "پنج‌شنبه" },
  { key: "friday", label: "جمعه" },
  { key: "saturday", label: "شنبه" },
];

const makeId = () => Math.random().toString(36).slice(2, 9);

const AvailableTimeForm: React.FC = () => {
  const [day, setDay] = useState<string>("monday");
  const [ranges, setRanges] = useState<TimeRange[]>([
    { start: null, end: null, id: makeId() },
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateRange = (
    id: string,
    field: "start" | "end",
    val: Date | null,
  ) => {
    setRanges((rs) =>
      rs.map((r) => (r.id === id ? { ...r, [field]: val } : r)),
    );
  };

  const addRange = () =>
    setRanges((rs) => [...rs, { start: null, end: null, id: makeId() }]);

  const removeRange = (id: string) =>
    setRanges((rs) => rs.filter((r) => r.id !== id));

  const combineDateWithTime = (timeDate: Date) => {
    const now = new Date();
    const d = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      timeDate.getHours(),
      timeDate.getMinutes(),
      0,
      0,
    );
    return d;
  };

  const submit = async () => {
    try {
      setLoading(true);
      setMessage(null);
      for (const r of ranges) {
        const startISO = formatISO(combineDateWithTime(r.start!));
        const endISO = formatISO(combineDateWithTime(r.end!));
        const company = localStorage.getItem("company");

        const payload = {
          companyId: company ? JSON.parse(company)._id : "",
          day,
          start: startISO,
          end: endISO,
        };

        const res = await fetch("http://localhost:5000/availableTime", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => null);
          throw new Error(err?.error || `خطا در ارسال بازه (${res.status})`);
        }
      }
      setMessage("✅ بازه‌ها با موفقیت ذخیره شدند.");
    } catch (err: any) {
      setError(err.message || "خطا در ذخیره بازه‌ها");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="time-page">
      <motion.div
        className="available-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2>تنظیم زمان‌های در دسترس</h2>

        <div className="day-section">
          <label>روز هفته</label>
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            {WEEK_DAYS.map((d) => (
              <option key={d.key} value={d.key}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <AnimatePresence>
          <div style={{maxHeight: 300, overflowY: 'auto', width: '100%', marginBottom: 20}}>
            {ranges.map((r) => (
              <motion.div
                key={r.id}
                className="range-item"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="picker">
                  <label>شروع</label>
                  <DatePicker
                    selected={r.start}
                    onChange={(d) => updateRange(r.id, "start", d)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="زمان"
                    dateFormat="HH:mm"
                    placeholderText="ساعت شروع"
                  />
                </div>

                <div className="picker">
                  <label>پایان</label>
                  <DatePicker
                    selected={r.end}
                    onChange={(d) => updateRange(r.id, "end", d)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="زمان"
                    dateFormat="HH:mm"
                    placeholderText="ساعت پایان"
                  />
                </div>

                <motion.button
                  type="button"
                  onClick={() => removeRange(r.id)}
                  className="remove-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  حذف
                </motion.button>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        <ButtonUI
          variant={VariantType.PRIMARY}
          type={buttonType.SUBMIT}
          onClick={addRange}
        >
           افزودن بازه جدید
        </ButtonUI>

        <ButtonUI
          variant={VariantType.SECONDARY}
          type={buttonType.SUBMIT}
          onClick={submit}
        >
          {loading ? "در حال ذخیره..." : " ذخیره"}{" "}
        </ButtonUI>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </motion.div>
    </div>
  );
};

export default AvailableTimeForm;
