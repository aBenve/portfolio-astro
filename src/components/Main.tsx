import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import About from "./About";
import MoveBackground from "./MoveBackground";
import MoveHello from "./MoveHello";

function Main() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const [scrollY, setScrollY] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (val) => {
    setScrollY(val);
  });

  return (
    <section ref={targetRef} className="relative z-0 h-[200vh] overflow-hidden">
      <MoveBackground trigger={scrollY === 0} />
      <MoveHello
        dissapear={scrollY === 1}
        scrollWhen={0.5}
        trigger={scrollY === 0}
        scrollYProgress={scrollYProgress}
      />
      <About
        dissapear={scrollY === 1}
        scrollWhen={0.52}
        appear={scrollY > 0}
        scrollYProgress={scrollYProgress}
      />
    </section>
  );
}

export default Main;
