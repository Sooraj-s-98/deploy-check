import { useRef, useState, useEffect } from "react";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineSend, AiOutlineCheckCircle } from "react-icons/ai";
import Header from "./Header";
import ChatItem from "./ChatItem";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  sendChatRequest,
  sendImageRequest,
} from "../helpers/apis/chat-communicators";

type Message = {
  role: "user" | "assistant" | "ocr" | "ocr-image";
  content: string;
};

const Messages = [
  { role: "user", content: "Hello this is a message content from user" },
  {
    role: "assistant",
    content: "Hello this is a message content from assistant",
  },
  { role: "ocr", content: "Hello this is a message content from ocr" },
];

const MainChat = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

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

  useEffect(() => {
    if (auth?.isLoggedin && auth.user) {
      console.log("Loading chats");
    } else {
      return navigate("/login");
    }
  }, [auth]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setUploadedImage(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (uploadedImage) {
      // Handle image upload
      const newMessage: Message = { role: "ocr-image", content: uploadedImage };
      setChatMessages((prev) => [...prev, newMessage]);

      try {
        const chatData = await sendImageRequest(uploadedImage);
        setChatMessages((prev) => [...prev, ...chatData.chats]);
      } catch (error) {
        console.error("Error processing image:", error);
        // Handle error (e.g., show an error message to the user)
      }

      setUploadedImage(null); // Clear the uploaded image after sending
    } else if (textareaRef.current?.value) {
      // Handle text input (unchanged)
      const content = textareaRef.current.value;
      textareaRef.current.value = "";
      const newMessage: Message = { role: "user", content };
      setChatMessages((prev) => [...prev, newMessage]);

      try {
        const chatData = await sendChatRequest(content);
        setChatMessages((prev) => [...prev, ...chatData.chats]);
      } catch (error) {
        console.error("Error sending chat:", error);
        // Handle error (e.g., show an error message to the user)
      }
    }
  };

  return (
    <div className="h-screen w-full bg-neutral-900 bg-dot-white/[0.2] flex flex-col">
      <Header />
      <div
        className="pointer-events-none inset-0 flex items-center justify-center
        bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      ></div>

      <div
        ref={chatContainerRef}
        className="flex-grow flex flex-col-reverse overflow-y-auto p-4 gap-4 ml-10"
      >
        {Messages.slice(0)
          .reverse()
          .map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
      </div>

      <section className="flex flex-col items-center justify-center p-4">
        <div
          className="flex items-center justify-center gap-2 bg-neutral-800 rounded-2xl 
        w-full max-w-4xl p-4"
        >
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="file-upload"
            onChange={handleImageUpload}
          />
          <label htmlFor="file-upload">
            <BiImageAdd size={24} className="text-white cursor-pointer" />
          </label>
          <textarea
            ref={textareaRef}
            placeholder="Insert a texual image or type a message..."
            className="bg-neutral-800 text-white w-full h-12 rounded-2xl 
            px-4 py-2 outline-none resize-none"
            rows={1}
          />
          <AiOutlineSend
            size={24}
            className="text-white cursor-pointer"
            onClick={handleSubmit}
          />
          {uploadedImage && (
            <AiOutlineCheckCircle size={24} className="text-green-500" />
          )}
        </div>
        <div className="relative px-2 py-2 text-center text-xs text-gray-300">
          <span>Image Wordy can make mistakes. Check important info.</span>
        </div>
      </section>
    </div>
  );
};

export default MainChat;
