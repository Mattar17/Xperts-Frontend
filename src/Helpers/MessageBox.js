import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MessageBox({ children, xSize, ySize }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className={`relative flex items-center justify-between left-[30px] -translate-x-1/2 mt-2 mb-2 bg-white px-${xSize} py-${ySize} rounded-xl shadow-lg z-50`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
