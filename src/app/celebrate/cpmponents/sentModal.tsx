import React, { useState } from "react";
import { Modalsent } from "../../components/modalsent";
import Image, { StaticImageData } from "next/image"; // StaticImageDataをインポート
import Styles from "./sentModal.module.css";
import { createClient } from "../../utils/supabase/client";

// Image imports
import bg1 from "../../../../public/bgimage/1.png";
import bg2 from "../../../../public/bgimage/2.png";
import bg3 from "../../../../public/bgimage/3.png";
import bg4 from "../../../../public/bgimage/4.png";
import bg5 from "../../../../public/bgimage/5.png";
import bg6 from "../../../../public/bgimage/6.png";
import bg7 from "../../../../public/bgimage/7.png";
import bg8 from "../../../../public/bgimage/8.png";

type SentModalProps = {
  isOpened: boolean;
  onClose: () => void;
};

const SentModal: React.FC<SentModalProps> = ({ isOpened, onClose }) => {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(
    null
  );

  const images = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8];

  const handleAddPost = () => {
    if (newPostContent.trim() === "" || !selectedImage) return; // 空の投稿や画像未選択を防ぐ
    setCurrentStep(2); // 次のステップに進む
  };

  const handleImageSelect = (image: StaticImageData) => {
    setSelectedImage(image);
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1); // Step1に戻る
  };

  const supabase = createClient();

  const handleSaveToDatabase = async () => {
    if (!newPostTitle || !newPostContent || !selectedImage) {
      alert("すべての項目を入力してください。");
      return;
    }

    const { data, error } = await supabase.from("celebratemessage").insert([
      {
        foruser_id: 1, // 例: ログイン中のユーザーID（動的に取得する必要あり）
        touser_id: 2, // 例: メッセージを受け取るユーザーID（選択式などで設定）
        hp_bday: "2000-01-01", // 例: ユーザーの誕生日（フォームなどで取得）
        title: newPostTitle,
        content: newPostContent,
        bgcolor: selectedImage.src.split("/").pop(), // ファイル名を抽出
      },
    ]);

    if (error) {
      console.error("エラー:", error);
      alert("データ保存に失敗しました。");
    } else {
      alert("メッセージが保存されました！");
      onClose(); // モーダルを閉じる
    }
  };

  return (
    <Modalsent isOpened={isOpened} setIsOpened={onClose}>
      <div className="flex flex-col items-center border-4 border-red-300 rounded-lg w-[96vw] h-[96vh]">
        {currentStep === 1 && (
          <>
            <h2 className={Styles.title1}>Birthday Message</h2>

            <div className="flex flex-row justify-center gap-3 items-center m-3">
              <h2 className="text-sm z-30 bg-yellow-100 rounded-3xl p-2">
                step1
              </h2>
              <h2 className="text-xl z-30 animate-tracking-in-expand">
                お祝いメッセージを入力
              </h2>
            </div>

            <input
              className="w-[270px] p-2 border rounded m-1 bg-white"
              placeholder="タイトルを入力してください..."
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />

            <textarea
              className="w-[270px] p-2 border rounded m-1 mb-2"
              rows={4}
              placeholder="内容を入力してください..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />

            <div className="flex flex-row justify-center gap-3 items-center m-3">
              <h2 className="text-sm z-30 bg-yellow-100 rounded-3xl p-2">
                step2
              </h2>
              <h2 className="text-xl z-30 animate-tracking-in-expand">
                お祝いカードを選択
              </h2>
            </div>

            <div className="flex flex-row gap-2 m-2 mb-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`border-2 rounded ${
                    selectedImage === image
                      ? "border-yellow-400"
                      : "border-transparent"
                  }`}
                  onClick={() => handleImageSelect(image)}
                >
                  <Image
                    src={image}
                    alt={`Background ${index + 1}`}
                    className="w-[30px] h-[30px] cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                className={`rounded px-4 py-2 mt-10 duration-300 ${
                  newPostTitle && newPostContent && selectedImage
                    ? "bg-yellow-100 text-black"
                    : "bg-gray-400 text-white"
                }`}
                onClick={handleAddPost}
              >
                次へ
              </button>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <div className="flex flex-col items-center justify-center mt-6">
            <div className=" w-[280px] bg-white relative">
              <div className="relative">
                {selectedImage && (
                  <div className="w-[280px] h-[350px]">
                    <Image
                      src={selectedImage}
                      alt="Selected background"
                      className="rounded object-cover w-[300px] h-full"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center rounded">
                      <div className="mb-4 text-xl bg-white min-w-32 px-4 py-1 rounded-xl font-bold">
                        {newPostTitle}
                      </div>
                      <div className="text-lg bg-white min-w-48 min-h-20 px-4 py-1 rounded-xl">
                        {newPostContent}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-4 gap-6">
              <button
                className="bg-gray-200 rounded px-4 py-2"
                onClick={handleBackToStep1}
              >
                戻る
              </button>
              <button
                className="bg-yellow-100 rounded px-4 py-2"
                onClick={handleSaveToDatabase}
              >
                完了
              </button>
            </div>
          </div>
        )}
      </div>
    </Modalsent>
  );
};

export default SentModal;
