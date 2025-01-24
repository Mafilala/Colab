import { motion } from "framer-motion";
import { stringToColor } from "@/lib/stringToColor";

const FollowPointer = ({
  x,
  y,
  info,
}: {
  x: number;
  y: number;
  info: {
    name: string;
    email: string;
    avatar?: string; // Optional
  };
}) => {
  const color = stringToColor(info.email || "default");

  return (
    <motion.div
      className="absolute flex items-center justify-center z-50"
      style={{
        pointerEvents: "none",
        top: y,
        left: x,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* SVG for the user's cursor */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: "rotate(45deg)", // Optional rotation for a "pointer" look
        }}
      >
        <path
          d="M4 4L20 10L13 13L10 20L4 4Z"
          fill={color}
          stroke="black"
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  );
};
export default FollowPointer;
