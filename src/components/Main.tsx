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

  const helloRef = useRef(null);
  const aboutRef = useRef(null);
  const helloIsInView = useInView(helloRef, { margin: "0px 50px 0px 0px" });
  const aboutIsInView = useInView(aboutRef, { margin: "0px 50px 0px 0px" });
  useMotionValueEvent(scrollYProgress, "change", (val) => {
    setScrollY(val);
  });

  return (
    <section ref={targetRef} className="relative z-0 h-[200vh] overflow-hidden">
      <MoveBackground trigger={scrollY === 0} />
      <MoveHello
        ref={helloRef}
        dissapear={helloIsInView}
        scrollWhen={0.5}
        trigger={scrollY === 0}
        scrollYProgress={scrollYProgress}
      />
      <About
        ref={aboutRef}
        dissapear={aboutIsInView}
        scrollWhen={0.52}
        appear={scrollY > 0}
        scrollYProgress={scrollYProgress}
      />
    </section>
  );
}

export default Main;
