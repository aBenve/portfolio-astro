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
    <motion.div
      className="left-[8rem] top-1/2 w-[20rem] -translate-y-1/2"
      style={{ position: position }}
    >
      <motion.div
        initial={{
          opacity: 0,
          transform: "translateX(-1rem)",
        }}
        animate={{
          opacity: appear ? 1 : 0,
          transform: appear ? "translateX(0)" : "translateX(-1rem)",
        }}
        transition={{
          duration: 0.5,
          delay: appear ? 0.8 : 0,
          ease: [0.76, 0.37, 0.37, 1.07],
        }}
      >
        <h2 className="font-secondary italic">About</h2>
      </motion.div>

      <motion.p
        className="font-primary text-xl font-bold"
        initial={{
          opacity: 0,
          transform: "translateY(1rem) ",
        }}
        animate={{
          opacity: appear ? 1 : 0,
          transform: appear ? "translateY(0)" : "translateY(1rem)",
        }}
        transition={{
          duration: 0.5,
          delay: appear ? 0.8 : 0,
          ease: [0.76, 0.37, 0.37, 1.07],
        }}
      >
        Hey! Im Agustin Benvenuto a software engineer student{" "}
        <span className="text-white">and a Front End enthusiast</span>
      </motion.p>
    </motion.div>
  );
}

export default About;
