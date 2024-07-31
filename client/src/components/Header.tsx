import { Avatar, AvatarFallback } from "./ui/Avatar";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const auth = useAuth();
  return (
    <header className="w-full flex items-center justify-between p-4 bg-neutral-800 bg-opacity-10 backdrop-blur-md">
      <h1 className="text-xl font-bold font-oswald text-white">Image Wordy</h1>
      <Avatar>
        <AvatarFallback
          className="text-white p-3 bg-slate-950 rounded-full w-10 h-10 
        flex items-center justify-center"
        >
          {auth?.user?.name.split("")[0]}
        </AvatarFallback>
      </Avatar>
    </header>
  );
};

export default Header;
