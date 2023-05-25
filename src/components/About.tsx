import { MotionValue, cubicBezier, motion, useTransform } from "framer-motion";

function About({
  ref,
  appear,
  dissapear,
  scrollWhen,
  scrollYProgress,
}: {
  ref?: any;
  appear: boolean;
  dissapear: boolean;
  scrollWhen: number;
  scrollYProgress: MotionValue<number>;
}) {
  //   const position = useTransform(scrollYProgress, (latest: number) => {
  //     return scrollWhen ? "absolute" : "fixed";
  //   });

  const scroll = useTransform(
    scrollYProgress,
    [scrollWhen, 1],
    ["0%", "-170%"]
  );

  return (
    <motion.div
      ref={ref}
      className={`fixed z-0 left-[8rem] top-1/2 w-[20rem] -translate-y-1/2 ${
        dissapear ? "invisible" : "visible"
      }`}
      //style={{ position: position }}
    >
      <motion.div style={{ y: scroll }}>
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
          <span className="text-light">and a Front End enthusiast</span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default About;
