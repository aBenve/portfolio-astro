import { motion, useScroll, useTransform } from "framer-motion";
import Particles from "./Particles";

function Minigame() {
  const { scrollYProgress } = useScroll();
  const scroll = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);

  return (
    <motion.section
      //style={{ y: scroll }}
      className="relative bg-black z-10 h-[50vh] w-full"
    >
      <Particles />
    </motion.section>
  );
}

export default Minigame;
