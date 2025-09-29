import { motion } from "framer-motion";
import { ButtonUI } from "../../ui-kit";
import { useTranslation } from "react-i18next";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { buttonType, VariantType } from "../../ui-kit/button/button.type";

const Welcome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/reserveTime");
  };

  return (
    <div className="welcome-page">
      <motion.main
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ padding: 20 }}>{t("welcome.welcome")}</h2>
        <motion.div whileHover={{ scale: 1.05 }} className="button-wrapper">
          <ButtonUI
            onClick={handleClick}
            type={buttonType.BUTTON}
            variant={VariantType.PRIMARY}
          >
            <motion.span className="button-text">
              {t("welcome.view_times")}
              <motion.span
                className="button-icon"
                initial={{ opacity: 0, x: -5 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              ></motion.span>
            </motion.span>
          </ButtonUI>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Welcome;
