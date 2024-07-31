import { useState } from "react";
import { SideBar, MainChat } from "../components";
import { Message } from "../helpers/types";

const Home: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  return (
    <main className="grid grid-cols-1 md:grid-cols-[20%_80%] h-screen">
      <section className="hidden md:flex md:flex-col bg-neutral-800 text-gray-200 font-palanquin">
        <SideBar
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </section>
      <section>
        <MainChat
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </section>
    </main>
  );
};

export default Home;
