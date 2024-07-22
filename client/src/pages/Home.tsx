import { SideBar, MainChat } from "../components";

const Home: React.FC = () => {
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-[20%_80%] h-screen">
        <section className="hidden md:block bg-neutral-800 text-gray-200 font-palanquin">
          <SideBar />
        </section>
        <section className="bg-neutral-900">
          <MainChat />
        </section>
      </main>
    </>
  );
};

export default Home;
