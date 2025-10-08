import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./Dashboard.scss";
import Overview from "./components/Overview";
import Schedule from "./components/Schedule";
import Services from "./components/Services";
import Company from "./components/Company";
import Bookings from "./components/Bookings";

type TabType = "overview" | "schedule" | "services" | "company" | "bookings";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>("services");

  const tabs = useMemo(
    () => [
      { id: "overview", label: t("dashboard.tabs.overview") },
      { id: "schedule", label: t("dashboard.tabs.schedule") },
      { id: "services", label: t("dashboard.tabs.services") },
      { id: "company", label: t("dashboard.tabs.company") },
      { id: "bookings", label: t("dashboard.tabs.bookings") },
    ],
    [t],
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>{t("dashboard.title")}</h1>
        <p>{t("dashboard.subtitle")}</p>
      </div>

      <div className="dashboard-layout">
        <div className="dashboard-sidebar">
          <nav className="dashboard-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === (tab.id as TabType) ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id as TabType)}
              >
                <span className="nav-label">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="dashboard-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="tab-content"
            >
              {activeTab === "overview" && <Overview />}
              {activeTab === "schedule" && <Schedule />}
              {activeTab === "services" && <Services />}
              {activeTab === "company" && <Company />}
              {activeTab === "bookings" && <Bookings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
