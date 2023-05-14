import { motion } from "framer-motion";

function MoveBackground({ trigger }: { trigger: boolean }) {
  return (
    <motion.div
      className=" h-full w-1/2 origin-left top-0 left-0 bg-red-500 "
      initial={{
        transform: "matrix(1, 0, 0, 1, 0, 0)",
      }}
      animate={{
        transform: trigger
          ? "matrix(1, 0, 0, 1, 0, 0)"
          : "matrix(2, 0, 0, 1, 0, 0)",
      }}
      transition={{
        duration: 1,
        ease: [0.7, 0, 0.3, 1],
      }}
    ></motion.div>
  );
}

export default MoveBackground;
