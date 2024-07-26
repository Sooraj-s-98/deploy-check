import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/Lamp";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center 
        text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          404 Page Not Found
          <br />
          <button
            className="w-40 h-10 rounded-xl bg-black border border-white 
                    border-transparent text-white text-sm"
            onClick={() => navigate("/")}
          >
            Get Back
          </button>
        </motion.h1>
      </LampContainer>
    </div>
  );
};

export default NotFound;
