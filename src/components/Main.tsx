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
          ease: [0.7, 0, 0.3, 1],
        }}
      ></motion.div>
      <motion.div
        className="top-1/2 left-1/2"
        initial={{
          transform: "translateX(-50%) translateY(-50%)",
        }}
        animate={{
          left: scrollY === 0 ? "50%" : "95%",
        }}
        style={{
          position: position,
        }}
        transition={{
          duration: 1,
          delay: 0.1,
          ease: [0.7, 0, 0.3, 1],
        }}
      >
        <Hello />
      </motion.div>
      <About appear={scrollY > 0} scrollYProgress={scrollYProgress} />
      <div
        style={{ transform: "translateX(40vw)" }}
        className="w-4 h-4 fixed top-[50vh] left-[50vw] bg-blue-300"
      ></div>
    </section>
  );
}

export default Main;
