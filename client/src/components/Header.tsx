import { Avatar, AvatarFallback } from "./ui/Avatar";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <header className="w-full flex items-center justify-between p-4 bg-neutral-800 bg-opacity-10 backdrop-blur-md">
      <h1 className="text-xl font-bold font-oswald text-white">Image Wordy</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            auth?.logout;
            navigate("/");
          }}
          className="w-28 h-12 flex justify-center p-2 rounded-md border border-slate-700 bg-neutral-900 
        text-red-400 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 gap-2"
        >
          <CiLogout size={30} />
          <span className="font-oswald text-xl">Logout</span>
        </button>
        <Avatar>
          <AvatarFallback
            className="text-white p-3 bg-slate-950 rounded-full w-10 h-10 
        flex items-center justify-center"
          >
            {auth?.user?.name.split("")[0]}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
