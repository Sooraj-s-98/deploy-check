import React from "react";
import { BsChatQuote } from "react-icons/bs";

const SideBar: React.FC = () => {
  return (
    <div className="flex justify-center items-center gap-2 pt-5">
      <BsChatQuote size={25} />
      <span className="font-oswald">Image Wordy</span>
    </div>
  );
};

export default SideBar;
