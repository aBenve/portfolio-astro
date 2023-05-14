import { motion, useScroll, useTransform } from "framer-motion";

function Minigame() {
  const { scrollYProgress } = useScroll();
  const scroll = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);

  return (
    <motion.section
      //style={{ y: scroll }}
      className="relative z-10 h-[80vh] bg-green-400 w-full"
    />
  );
}

export default Minigame;
