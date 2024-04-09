import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

type DropdownProps = {
  title: string | React.ReactNode;
  shortCaption?: string | React.ReactNode;
  children: React.ReactNode;
};

// Dropdown component com check box para verificar se está aberto ou fechado
export const Dropdown = ({ title, shortCaption, children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-sm ">
      <button
        onClick={handleOpen}
        className={`flex items-center justify-between w-full p-2 text-sm text-gray-700 bg-white outline-none border-none rounded-lg`}
      >
        <div className="text-left">
          <span className="overflow-hidden text-ellipsis max-h-[1.8rem]">
            {title}
          </span>
          <span>{shortCaption}</span>
        </div>

        <span className="text-gray-400">
          {isOpen ? (
            <ArrowUp className="w-4 h-4" />
          ) : (
            <ArrowDown className="w-4 h-4" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className=" z-10 w-full bg-white rounded-md shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};
