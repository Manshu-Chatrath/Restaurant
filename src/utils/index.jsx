export const imageAnimation = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};
export const textAnimation = {
  hidden: { opacity: 0, transform: "rotate(20deg)", x: 1000 },
  visible: { opacity: 1, transform: "rotate(0deg)", x: 0 },
};
export const SUCCESS = "success";
export const PENDING = "inProgress";
export const FAILED = "failed";
export const IDLE = "idle";
