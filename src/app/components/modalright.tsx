import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

interface ModalrightProps {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  children: ReactNode;
}

export const Modalright: React.FC<ModalrightProps> = ({
  isOpened,
  setIsOpened,
  children,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div
        id="modalContent"
        className={`fixed p-0 z-30 flex h-[88vh] w-screen sm:w-[375px] sm:w-lg xl:w-xl scroll-mt-0 flex-col hidden-scrollbar rounded-t-2xl bg-pink-light pb-12 duration-200 delay-75 shadow-[0_-4px_4px_0px_rgba(0,0,0,0.3)]
        ${isOpened ? "bottom-0" : "bottom-[-100vh]"}`}
      >
        <div
          className="absolute m-4 rounded-full flex text-white font-bold text-lg"
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
