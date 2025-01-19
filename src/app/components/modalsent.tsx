import { ReactNode } from "react";

interface ModalsentProps {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  children: ReactNode;
}

export const Modalsent: React.FC<ModalsentProps> = ({
  isOpened,
  setIsOpened,
  children,
}) => {
  return (
    <div>
      {isOpened && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-base-black opacity-40 z-50"></div>
      )}

      <div
        className={`flex flex-col items-center justify-center ${
          isOpened ? "z-50" : "z-[-10]"
        }`}
      >
        <div
          id="modalContent"
          className={`fixed top-[2vh] h-[96vh] flex sm:w-lg xl:w-xl scroll-mt-0 flex-col items-center hidden-scrollbar rounded-2xl bg-white duration-200 delay-75 shadow-[0_-8px_12px_4px_rgba(0,0,0,0.3) animate-fade-in-top]
          ${
            isOpened
              ? "bottom-0 opacity-100 z-[100]"
              : "bottom-[-100vh] opacity-0"
          }`}
        >
          <div
            className="absolute bottom-4 w-12 h-12 bg-green-light rounded-full flex justify-center items-center text-white font-bold text-lg "
            onClick={() => {
              setIsOpened(false);
            }}
          ></div>
          {children}
        </div>
      </div>
    </div>
  );
};
