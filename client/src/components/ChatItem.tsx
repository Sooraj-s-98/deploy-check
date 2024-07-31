import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { useAuth } from "../context/AuthContext";

const ChatItem = ({ content, role }: { content: string; role: string }) => {
  const auth = useAuth();
  return (
    <div>
      {role === "user" && (
        <>
          <div
            className="text-white grid grid-cols-1 md:grid-cols-[10%_90%]
         bg-neutral-800 rounded-2xl w-full max-w-4xl p-5 font-palanquin"
          >
            <Avatar>
              <AvatarFallback
                className="text-white p-3 bg-slate-950 rounded-full w-10 h-10 
                flex items-center justify-center"
              >
                {auth?.user?.name.split("")[0]}
              </AvatarFallback>
            </Avatar>
            <p>{content}</p>
          </div>
        </>
      )}
      {role === "assistant" && (
        <>
          <div
            className="text-white grid grid-cols-1 md:grid-cols-[10%_90%]
         bg-neutral-800 rounded-2xl w-full max-w-4xl p-5 font-montserrat"
          >
            <Avatar>
              <AvatarImage src="/BsChatQuote-transparent.png" alt="IM logo" />
              <AvatarFallback>IW</AvatarFallback>
            </Avatar>
            <div className="bg-neutral-900 p-5 border border-slate-700 rounded-md">
              <TextGenerateEffect words={content} />
            </div>
          </div>
        </>
      )}
      {role === "ocr" && (
        <>
          <div
            className="text-white grid grid-cols-1 md:grid-cols-[10%_90%]
         bg-neutral-800 rounded-2xl w-full max-w-4xl p-5 font-montserrat"
          >
            <Avatar>
              <AvatarImage src="/BsChatQuote-transparent.png" alt="user" />
              <AvatarFallback>IW</AvatarFallback>
            </Avatar>
            <div className="bg-neutral-900 p-5 border border-slate-700 rounded-md">
              <TextGenerateEffect words={content} />
            </div>
          </div>
        </>
      )}
      {role === "ocr-image" && (
        <>
          <div
            className="text-white grid grid-cols-1 md:grid-cols-[10%_90%]
         bg-neutral-800 rounded-2xl w-full max-w-4xl p-5"
          >
            <Avatar>
              <AvatarFallback
                className="text-white p-3 bg-slate-950 rounded-full w-10 h-10 
                flex items-center justify-center"
              >
                {auth?.user?.name.split("")[0]}
              </AvatarFallback>
            </Avatar>
            <img src={content} alt="ocr-image" />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatItem;
