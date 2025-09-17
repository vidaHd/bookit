import type { Props } from "./button.type";
import { motion } from "framer-motion";

import "./button.scss";

const ButtonUI = ({ onClick, children, variant, type }: Props) => {
  return (
    <motion.button
      className={`btn btn-${variant}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={type}
    >
      {children}
    </motion.button>
  );
};

export default ButtonUI;
