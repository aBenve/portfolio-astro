import { MotionValue, motion, useTransform } from "framer-motion";

function About({
  appear,
  scrollYProgress,
}: {
  appear: boolean;
  scrollYProgress: MotionValue<number>;
}) {
  const position = useTransform(scrollYProgress, (latest: number) => {
    return latest >= 0.5 ? "absolute" : "fixed";
  });
  return (
    <motion.div className="left-20 top-1/2" style={{ position: position }}>
      abot
    </motion.div>
  );
}

export default About;
