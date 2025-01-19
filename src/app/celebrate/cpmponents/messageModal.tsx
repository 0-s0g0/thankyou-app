import React from "react";
import { Modalsent } from "../../components/modalsent";
import Image from "next/image"; // StaticImageDataをインポート
import Styles from "./sentModal.module.css";
import { CelebrateMessage } from "../../components/types";

// Image imports
import bg1 from "../../../../public/bgimage/1.png";
import bg2 from "../../../../public/bgimage/2.png";
import bg3 from "../../../../public/bgimage/3.png";
import bg4 from "../../../../public/bgimage/4.png";
import bg5 from "../../../../public/bgimage/5.png";
import bg6 from "../../../../public/bgimage/6.png";
import bg7 from "../../../../public/bgimage/7.png";
import bg8 from "../../../../public/bgimage/8.png";

type MessageModalProps = {
  isOpened: boolean;
  onClose: () => void;
  message: CelebrateMessage | null;
};

const MessageModal = ({ isOpened, onClose, message }: MessageModalProps) => {
  const images = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8];
  // bgcolor から先頭の数字部分を抽出して対応する画像を選択
  const getImageByBgColor = (bgcolor: string) => {
    const index = parseInt(bgcolor.split(".")[0], 10) - 1; // セパレーター「.」で分割し、最初の部分を数値化
    return images[index] || images[0]; // 数字に対応する画像を返す（範囲外なら最初の画像を返す）
  };

  if (!isOpened || !message) return null;

  const selectedImage = getImageByBgColor(message.bgcolor); // bgcolorに対応する画像を取得

  return (
    <Modalsent isOpened={isOpened} setIsOpened={onClose}>
      <h2 className={Styles.title1}>Birthday Message</h2>
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="w-[280px] bg-white relative">
          <div className="relative">
            {selectedImage && (
              <div className="w-[280px] h-[350px]">
                <Image
                  src={selectedImage}
                  alt="Selected background"
                  className="rounded object-cover w-[300px] h-full"
                />
                <div className="absolute inset-0 flex flex-col justify-center  text-center rounded">
                  <div className="mb-9 text-xl ">{message.title}</div>
                  <div className="m-8 text-xl ">{message.content}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-4 gap-6"></div>
      </div>
    </Modalsent>
  );
};

export default MessageModal;
