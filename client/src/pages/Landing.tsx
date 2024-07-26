import { TypewriterEffectSmooth } from "../components/ui/TypewriterEffect";
import { useNavigate } from "react-router-dom";
import { BsChatQuote } from "react-icons/bs";

const Landing = () => {
  const navigate = useNavigate();

  const words = [
    {
      text: "Intelligent",
    },
    {
      text: "Image - textual",
    },
    {
      text: "analysis",
    },
    {
      text: "with",
    },
    {
      text: "AI.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <>
      <div className="bg-slate-950 flex flex-col items-center justify-center h-screen  ">
        <div className="flex items-center justify-center gap-5">
          <BsChatQuote size={100} className="text-neutral-100" />
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Image Wordy
          </h1>
        </div>
        <TypewriterEffectSmooth words={words} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <button
            className="w-40 h-10 rounded-xl bg-black border border-white 
        border-transparent text-white text-sm"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="w-40 h-10 rounded-xl bg-white text-black border 
        border-black  text-sm"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </div>
      </div>
    </>
  );
};

export default Landing;
