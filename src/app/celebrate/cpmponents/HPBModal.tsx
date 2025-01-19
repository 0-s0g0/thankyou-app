// components/NewPostModal.tsx
import React from "react";
import { Modalcelebrate } from "../../components/modalcelebrate";
import Confetti from "react-confetti";
import HPB from "../../../../public/HPB2.jpg";
import Mail from "../../../../public/mail2.png";
import Image from "next/image";
import Styles from "./sentModal.module.css";

type HPBModalProps = {
  isOpened: boolean;
  onClose: () => void;
};

const HPBModal: React.FC<HPBModalProps> = ({ isOpened, onClose }) => {
  return (
    <Modalcelebrate isOpened={isOpened} setIsOpened={onClose}>
      <div className="flex flex-col items-center ">
        <Image src={HPB} alt="" width={240} className="m-11 z-10" />
        <div className={Styles.fukidashi}>クリック</div>
        <Image src={Mail} alt="" width={140} className="z-10 animate-bounce" />

        <div className="flex justify-end"></div>
      </div>
      <Confetti width={300} height={450} recycle={true} />
    </Modalcelebrate>
  );
};

export default HPBModal;
