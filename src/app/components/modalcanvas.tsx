import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

interface ModalcanvasProps {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  children: ReactNode;
}

export const Modalcanvas: React.FC<ModalcanvasProps> = ({
  isOpened,
  setIsOpened,
  children,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div
        id="modalContent"
        className={` fixed p-0 z-30 flex h-[88vh] w-screen sm:w-[375px] sm:w-lg xl:w-xl scroll-mt-0 flex-col hidden-scrollbar rounded-t-2xl pb-12  animate-fade-in-top]
        ${isOpened ? "bottom-0 opacity-100" : "bottom-[-100vh] opacity-0"}`}
      >
        <div
          className="absolute p-8 w-12 h-12 rounded-full flex text-white font-bold text-lg"
          onClick={() => {
            setIsOpened(false);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-6 h-6" />
        </div>
        {children}
      </div>
    </div>
  );
};