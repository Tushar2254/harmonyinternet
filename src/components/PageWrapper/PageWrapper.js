import { motion } from 'framer-motion';

const variants = {
  initial:  { opacity: 0, y: 20 },
  animate:  { opacity: 1, y: 0,   transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
  exit:     { opacity: 0, y: -12, transition: { duration: 0.28, ease: 'easeIn' } },
};

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ paddingTop: '106px' }} /* 38px topbar + 68px navbar */
    >
      {children}
    </motion.div>
  );
}

export default PageWrapper;
