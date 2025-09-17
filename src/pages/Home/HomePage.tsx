import { motion } from "framer-motion";
import { ButtonUI } from "../../ui-kit";
import { ButtonType } from "../../ui-kit/button/button.type";
import "./Home.scss";
import heroImage from "../../assets/images/home.jpg";

const Welcome = () => {
  return (
    <div className="welcome-page">
      <motion.main
        className="hero-section"
        style={{ backgroundImage: 'linear-gradient(-130deg,#6cc -1%,#43505f 25%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Welcome to BookIt!</h1>
        <div className="buttons">
          <ButtonUI
            type={ButtonType.PRIMARY}
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </ButtonUI>

          <ButtonUI
            type={ButtonType.SECONDARY}
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </ButtonUI>
        </div>
      </motion.main>
    </div>
  );
};
export default Welcome;
