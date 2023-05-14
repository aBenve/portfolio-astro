import { motion, useScroll, useTransform } from "framer-motion";

function Projects() {
  const { scrollYProgress } = useScroll();
  const scroll = useTransform(scrollYProgress, [0.5, 1], ["0%", "-150%"]);

  return (
    <motion.section
      //style={{ y: scroll }}
      className="relative z-20 bg-blue-400 min-h-screen"
    ></motion.section>
  );
}

export default Projects;
