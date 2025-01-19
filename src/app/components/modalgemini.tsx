import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

interface ModalgeminiProps {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  children: ReactNode;
}

export const Modalgemini: React.FC<ModalgeminiProps> = ({
  isOpened,
  setIsOpened,
  children,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        id="modalContent"
        className={` fixed top-32 p-0 z-40 flex h-[350px] w-[300px] sm:w-lg xl:w-xl scroll-mt-0 flex-col items-center hidden-scrollbar rounded-2xl bg-blue-100 pb-12 duration-200 delay-75 shadow-[0_-8px_12px_4px_rgba(0,0,0,0.3)]
        ${isOpened ? "bottom-0 opacity-100" : "bottom-[-100vh] opacity-0"}`}
      >
        <div
          className=" absolute bottom-5 w-[20px] h-[20px] z-50"
          onClick={() => {
            setIsOpened(false);
          }}
        >
          <FontAwesomeIcon icon={faX} className="w-[20px] h-[20px] text-white" />
        </div>
        {children}
      </div>
    </div>
  );
};