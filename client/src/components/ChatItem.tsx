import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

const ChatItem = ({ content, role }: { content: string; role: string }) => {
  return (
    <div>
      {role === "user" && (
        <>
          <div
            className="text-white flex items-center justify-start gap-2
         bg-neutral-800 rounded-2xl w-full max-w-4xl p-5"
          >
            <Avatar>
              <AvatarImage src="../../public/imageWordyLogo.svg" alt="user" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <p>{content}</p>
          </div>
        </>
      )}
      {role === "assistant" && (
        <>
          <div
            className="text-white flex items-center justify-start gap-2
       bg-neutral-800 rounded-2xl w-full max-w-4xl p-5 font-palanquin"
          >
            <Avatar>
              <AvatarImage src="../../public/openai.png" alt="user" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <p>{content}</p>
          </div>
        </>
      )}
      {role === "ocr" && (
        <>
          <div
            className="text-white flex items-center justify-start gap-2
       bg-neutral-800 rounded-2xl w-full max-w-4xl p-5 font-montserrat"
          >
            <Avatar>
              <AvatarImage src="../../public/tesaractImg.png" alt="user" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <p>{content}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatItem;
