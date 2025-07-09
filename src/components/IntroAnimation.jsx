import { motion } from "framer-motion";
import "./IntroAnimation.css"; // 👈 background image ke 

const IntroAnimation = () => (
  <motion.div
  className="intro-bg h-screen flex justify-center items-center text-white text-4xl px-6"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{delay: 1.5, duration: 1.5, ease: "easeInOut"}}>

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2.0, ease: "easeInOut" }}
  >
    <div className="translate-x-20 text-4xl">
    अष्टावक्र गीता </div>
  </motion.div>
  </motion.div>
);

export default IntroAnimation;