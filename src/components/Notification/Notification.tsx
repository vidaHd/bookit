import { AnimatePresence, motion } from "framer-motion";

const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  setTimeout(onClose, 5000);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
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