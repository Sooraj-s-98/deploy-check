import React from "react";
import { Button } from "./ui/MovingBorder";
import { BsChatQuote } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteUserChats } from "../helpers/apis/chat-communicators";

type Message = {
  role: "user" | "assistant" | "ocr" | "ocr-image";
  content: string;
};

interface SideBarProps {
  chatMessages: Message[];
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const SideBar: React.FC<SideBarProps> = ({ setChatMessages }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleDeleteChats = async () => {
    try {
      await deleteUserChats();
      setChatMessages([]);
    } catch (error) {
      console.log(error);
    }
  };

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
      <section className="flex flex-col items-center justify-between flex-grow overflow-y-auto p-5 gap-5">
        <div className="bg-neutral-900 p-5 border border-slate-700 rounded-md w-full max-w-md text-center font-oswald font-light">
          <p>
            Welcome to Image Wordy! <br /> To get started, simply upload an
            image or type your query in the chat. Our chatbot will analyze the
            text in the image and provide you with insightful responses.
          </p>
          <br />
          <span>
            Please note: Currently, we only support images containing English
            language text.
          </span>
        </div>
        <div>
          <button
            onClick={handleDeleteChats}
            className="w-56 flex justify-center px-4 py-2 rounded-md border border-black bg-neutral-900 
            text-amber-300 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 gap-2"
          >
            <MdDelete size={35} />
            <span className="font-oswald text-lg">Clear Chat History</span>
          </button>
        </div>
      </section>

      {/* bottom */}
      <section className="flex flex-col justify-center items-center gap-2 p-5">
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
        <div className="relative px-2 py-2 text-center text-xs text-gray-300">
          <span>Copyright &copy; Image Wordy 2024</span>
        </div>
      </section>
    </div>
  );
};

export default SideBar;
