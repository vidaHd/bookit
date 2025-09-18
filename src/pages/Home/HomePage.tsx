import { motion } from "framer-motion";
import { ButtonUI } from "../../ui-kit";
import "./Home.scss";
import heroImage from "../../assets/images/home.jpg";
import { useTranslation } from "react-i18next";

const Welcome = () => {
    const { t, i18n } = useTranslation('header');

console.log(t);

  return (
    <div className="welcome-page">
      <motion.main
        className="hero-section"
        style={{
          backgroundImage: "linear-gradient(-130deg,#6cc -1%,#43505f 25%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
      <h2>{t("welcome")}</h2>
        <div className="buttons">
          Online Schedule System Bookitit Online Booking System Bookitit is the
          online reservation system that allows your customers to book through
          your business’s website, Instagram profile, Facebook page or Google by
          Bussiness. The online appointment system also allows you to manage
          reservations made in person or by phone, entering them in your
          company’s online calendar. The Bookitit online reservation system
          offers countless features that can help your business significantly
          improve the management of any business that requires a reservation or
          prior appointment. The Bookitit online reservation application adapts
          to practically all sectors such as hairdressers, beauty centers,
          medical clinics, sports centers, health centers, paddle tennis courts,
          town halls, training centers, universities, public administrations,
          mechanical workshops, veterinary clinics , driving schools,
          photography studios, real estate agencies and many more.
        </div>
      </motion.main>
    </div>
  );
};
export default Welcome;
