import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/Lamp";
import { LoginForm } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      return navigate("/home");
    }
  }, [auth]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[40%_60%] h-screen">
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
          Login to <br /> Image Wordy
        </motion.h1>
      </LampContainer>
      <section className="bg-slate-950 flex flex-col justify-center items-center">
        <LoginForm />
        <span className="text-sm max-w-sm mt-2 text-neutral-300 p-2">
          Don't have an account?{" "}
          <Link to="/signup" className="underline decoration-2">
            Sign up
          </Link>
        </span>
      </section>
    </div>
  );
};

export default Login;
