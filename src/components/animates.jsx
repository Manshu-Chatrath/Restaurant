import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
const Animate = ({ children, variants }) => {
  const ref = useRef();
  const inView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  useEffect(() => {
    if (inView) {
      mainControls.start("visible");
    }
  }, [inView]);

  return (
    <Box ref={ref}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={mainControls}
        transition={{
          duration: 1,
          delay: 0.25,
        }}>
        {children}
      </motion.div>
    </Box>
  );
};
Animate.propTypes = {
  children: PropTypes.any.isRequired,
  variants: PropTypes.object.isRequired,
};

export default Animate;
