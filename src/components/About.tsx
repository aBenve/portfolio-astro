import { MotionValue, cubicBezier, motion, useTransform } from "framer-motion";
import ContactButton from "./ContactButton";
import CVButton from "./CVButton";

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
  const scroll = useTransform(
    scrollYProgress,
    [scrollWhen, 1],
    ["0%", "-170%"]
  );

  return (
    <motion.div
      ref={ref}
      className={`fixed z-0 2xl:left-[20rem] md:left-[20%] left-[2rem] top-[calc(100%-20rem)] md:top-1/2 w-[20rem] lg:w-[38rem] -translate-y-1/2 ${
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
          <h2 className="font-secondary md:text-lg text-base italic mb-2">
            About
          </h2>
        </motion.div>

        <motion.p
          className="font-primary lg:text-3xl md:text-2xl text-xl leading-6 font-bold mb-4"
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
          <span className="text-light">and a Frontend enthusiast</span>
        </motion.p>
        <motion.div
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
            delay: appear ? 0.8 + 0.3 : 0,
            ease: [0.76, 0.37, 0.37, 1.07],
          }}
        >
          <div className="flex mt-5 gap-x-5 ">
            <ContactButton />
            <CVButton />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default About;
