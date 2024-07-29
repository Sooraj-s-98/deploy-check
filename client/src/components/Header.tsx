import { useAuth } from "../context/AuthContext";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

const Header = () => {
  const auth = useAuth();
  return (
    <header className="w-full flex items-center justify-between p-4 bg-white bg-opacity-10 backdrop-blur-md">
      <h1 className="text-xl font-bold text-white">Image Wordy</h1>
      <Avatar>
        <AvatarFallback>{auth?.user?.name.split("")[0]}</AvatarFallback>
      </Avatar>
    </header>
  );
};

export default Header;
