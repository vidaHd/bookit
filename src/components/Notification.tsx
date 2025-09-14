import { AnimatePresence, motion } from "framer-motion";
import '../styles/booking.scss';

const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  setTimeout(onClose, 5000);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="toast"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Toast