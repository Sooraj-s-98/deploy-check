import React from "react";
import { Button } from "./ui/MovingBorder";
import { BsChatQuote } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SideBar: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      {/* top section */}
      <section className="flex justify-center items-center gap-2 p-5">
        <Button
          borderRadius="1.75rem"
          className="bg-neutral-900 text-neutral-100 border-slate-800 flex justify-center items-center gap-2 p-5"
        >
          <BsChatQuote size={30} />
          <span className="font-oswald text-lg">Image Wordy</span>
        </Button>
      </section>

      {/* Middle */}
      <section className="flex-grow overflow-y-auto h-[80vh]">
        {/* Your future component will go here */}
        <div className="h-full bg-gray-100 p-4">
          {/* Placeholder content */}
          <p>This is where your future component will be placed.</p>
        </div>
      </section>

      {/* bottom */}
      <section className="flex justify-center items-center gap-2 p-5">
        <button
          onClick={() => {
            auth?.logout;
            navigate("/");
          }}
          className="w-56 flex justify-center px-4 py-2 rounded-md border border-black bg-neutral-900 
      text-red-400 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 gap-2"
        >
          <CiLogout size={35} />
          <span className="font-oswald text-lg">Logout</span>
        </button>
      </section>
    </div>
  );
};

export default SideBar;
