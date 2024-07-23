import { useRef, useEffect, useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { AiOutlineSend } from "react-icons/ai";

const MainChat = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.addEventListener("input", handleInput);
    }
    return () => {
      if (textareaRef.current) {
        textareaRef.current.removeEventListener("input", handleInput);
      }
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen w-full bg-neutral-900 bg-dot-white/[0.2] flex flex-col">
      <header className="w-full flex items-center justify-between p-4 bg-white bg-opacity-10 backdrop-blur-md">
        <button onClick={toggleSidebar} className="text-white">
          <TbLayoutSidebarLeftExpandFilled size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Image Wordy</h1>
      </header>
      <div
        className="pointer-events-none inset-0 flex items-center justify-center
        bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      ></div>

      <div className="flex-grow flex items-center justify-center bg-zinc-700 h-20 w-96 rounded-2xl m-4">
        Chat Content
      </div>

      <section className="flex flex-col items-center justify-center p-4">
        <div className="flex items-center justify-center gap-2 bg-zinc-700 rounded-2xl w-full max-w-4xl p-4">
          <FiPaperclip size={24} className="text-white cursor-pointer" />
          <textarea
            ref={textareaRef}
            placeholder="Type a message..."
            className="bg-neutral-800 text-white w-full h-12 rounded-2xl px-4 py-2 outline-none resize-none"
            rows={1}
          />
          <AiOutlineSend size={24} className="text-white cursor-pointer" />
        </div>
        <div className="relative px-2 py-2 text-center text-xs text-gray-300">
          <span>Image Wordy can make mistakes. Check important info.</span>
        </div>
      </section>
    </div>
  );
};

export default MainChat;
