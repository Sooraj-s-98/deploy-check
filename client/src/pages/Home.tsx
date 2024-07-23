import { SideBar, MainChat } from "../components";

const Home: React.FC = () => {
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-[20%_80%] h-screen">
        <section className="hidden md:flex md:flex-col bg-neutral-800 text-gray-200 font-palanquin">
          <SideBar />
        </section>
        <section>
          <MainChat />
        </section>
      </main>
    </>
  );
};

export default Home;
