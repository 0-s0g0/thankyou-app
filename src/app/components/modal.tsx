import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

interface ModalProps {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpened,
  setIsOpened,
  children,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        id="modalContent"
        className={`fixed p-0 z-30 flex h-[80vh] w-screen sm:w-[375px] sm:w-lg xl:w-xl scroll-mt-0 flex-col items-center hidden-scrollbar rounded-t-2xl bg-pink-light pb-12 duration-200 delay-75 shadow-[0_-4px_4px_0px_rgba(0,0,0,0.3)]
        ${isOpened ? "bottom-0 opacity-100" : "bottom-[-100vh] opacity-0"}`}
      >
        <div
          className="absolute top-4 right-4 w-8 h-8 bg-green-light rounded-full flex justify-center items-center text-pink-dark bg-white shadow-md font-bold text-lg"
          onClick={() => {
            setIsOpened(false);
          }}
        >
          <FontAwesomeIcon icon={faX} className="w-4 h-4" />
        </div>
        {children}
      </div>
    </div>
  );
};
