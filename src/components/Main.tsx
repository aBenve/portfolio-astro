import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import Hello from "./Hello";
import About from "./About";

function Main() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const [scrollY, setScrollY] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (val) => {
    setScrollY(val);
  });

  const position = useTransform(scrollYProgress, (latest) => {
    return latest >= 0.5 ? "absolute" : "fixed";
  });

  return (
    <section ref={targetRef} className="relative h-[200vh] overflow-hidden">
      <motion.div
        className=" h-full w-1/2 origin-left top-0 left-0 bg-red-500 "
        initial={{
          transform: "matrix(1, 0, 0, 1, 0, 0)",
        }}
        animate={{
          transform:
            scrollY === 0
              ? "matrix(1, 0, 0, 1, 0, 0)"
              : "matrix(2, 0, 0, 1, 0, 0)",
        }}
        transition={{
          duration: 1,
          ease: [0.76, 0.37, 0.37, 1.07],
        }}
      ></motion.div>
      <motion.div
        className="top-1/2 right-1/2"
        initial={{
          transform: "translateX(50%) translateY(-50%)",
        }}
        animate={{
          transform:
            scrollY === 0
              ? "translateX(50%) translateY(-50%)"
              : "translateX(64vw) translateY(-50%)",
        }}
        style={{
          position: position,
        }}
        transition={{
          duration: 1,
          delay: 0.1,
          ease: [0.76, 0.37, 0.37, 1.07],
        }}
      >
        <Hello />
      </motion.div>
      <About appear={scrollY > 0} scrollYProgress={scrollYProgress} />
    </section>
  );
}

export default Main;
