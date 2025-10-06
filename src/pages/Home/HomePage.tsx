import React from "react";
import { motion } from "framer-motion";
import { ButtonUI } from "../../ui-kit";
import { useTranslation } from "react-i18next";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { VariantType } from "../../ui-kit/button/button.type";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate("/reserveTime");
  };

  const handleAdminLogin = () => {
    navigate("/login");
  };

  const features = [
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
      ),
      title: "رزرو آنلاین",
      description: "به راحتی و در هر زمان نوبت خود را رزرو کنید",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      title: "سرویس‌های متنوع",
      description: "انواع سرویس‌های کیفیت بالا",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 12l2 2 4-4" />
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
          <path d="M13 12h3a2 2 0 0 1 2 2v1" />
          <path d="M11 12H8a2 2 0 0 0-2 2v1" />
        </svg>
      ),
      title: "تضمین کیفیت",
      description: "کیفیت و رضایت مشتری اولویت ماست",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      title: "قیمت مناسب",
      description: "قیمت‌های رقابتی و منصفانه",
    },
  ];

  const stats = [
    { number: "500+", label: "مشتری راضی" },
    { number: "1000+", label: "رزرو موفق" },
    { number: "5+", label: "سال تجربه" },
    { number: "24/7", label: "پشتیبانی" },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>

        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              استاد آلمانی <span className="highlight">با تجربه</span>
            </h1>
            <p className="hero-subtitle">
              پیشرفت شما در دستان متخصصان ماست. با بهترین سرویس‌ها و تجهیزات
              مدرن، لحظات خوبی و بی‌نظیری را تجربه کنید.
            </p>

            <div className="hero-actions">
              <ButtonUI
                variant={VariantType.PRIMARY}
                onClick={handleBookAppointment}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
                رزرو نوبت
              </ButtonUI>

              <ButtonUI
                variant={VariantType.SECONDARY}
                onClick={handleAdminLogin}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10,17 15,12 10,7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                ورود ادمین
              </ButtonUI>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>چرا ما را انتخاب کنید؟</h2>
            <p>ویژگی‌های منحصر به فرد که ما را از دیگران متمایز می‌کند</p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>آماده برای تجربه پیشرفت هستید؟</h2>
            <p>همین حالا نوبت خود را رزرو کنید و پیشرفت خود را به ما بسپارید</p>
            <ButtonUI
              variant={VariantType.PRIMARY}
              onClick={handleBookAppointment}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              رزرو نوبت آنلاین
            </ButtonUI>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
