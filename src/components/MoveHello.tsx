import type { MotionValue } from "framer-motion";
import { motion, useTransform } from "framer-motion";
import Hello from "./Hello";

function MoveHello({
  ref,
  trigger,
  scrollWhen,
  dissapear,
  scrollYProgress,
}: {
  ref?: any;
  trigger: boolean;
  scrollWhen: number;
  dissapear: boolean;
  scrollYProgress: MotionValue<number>;
}) {
  //   const position = useTransform(scrollYProgress, (latest) => {
  //     return scrollWhen ? "absolute" : "fixed";
  //   });
  const scroll = useTransform(
    scrollYProgress,
    [scrollWhen, 1],
    ["0%", "-120%"]
  );

  return (
    <motion.div
      ref={ref}
      className={`fixed top-1/2 left-1/2 ${
        dissapear ? "invisible" : "visible"
      } `}
      initial={{
        transform: "translateX(-50%) translateY(-50%)",
      }}
      animate={{
        left: trigger ? "50%" : "95%",
      }}
      transition={{
        duration: 1,
        delay: 0.1,
        ease: [0.7, 0, 0.3, 1],
      }}
    >
      <motion.div
        style={{
          y: scroll,
        }}
      >
        <Hello />
      </motion.div>
    </motion.div>
  );
}

export default MoveHello;
