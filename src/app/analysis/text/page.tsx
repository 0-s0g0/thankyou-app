"use client";

import React, { useState } from "react";

export const GeminiButton: React.FC = () => {
  const [isResultVisible, setIsResultVisible] = useState(false); // 結果の表示/非表示を管理

  // ボタンをクリックした時に表示/非表示を切り替える
  const handleToggleResult = () => {
    setIsResultVisible((prev) => !prev); // 現在の状態を反転
  };

  return (
    <div className="flex flex-col items-center justify-center m-5">
      <h1>投稿内容からトレンドを生成</h1>
      <button
        onClick={handleToggleResult} // ボタンで表示切り替え
        className="m-5 bg-pink-300 p-3 text-white rounded-lg"
      >
        {isResultVisible ? "結果を非表示にする" : "生成された結果を見る"}
      </button>
      <div className="flex flex-col items-center justify-center m-5 bg-white">
        {isResultVisible && (
          <>
            <h2 className="flex flex-col items-center justify-center m-5">生成された結果</h2>
            <div className="m-6  flex-col items-center justify-center w-[300px]">
            <div className="m-6 font-bold text-center" >ランキング</div>
                <div className="m-6  flex-col items-center justify-center">
                
                <div>1. 手紙</div>
                <div>2. 日常の中でのサポート</div>
                <div>3. 楽しい時間を共有するエピソード</div>
                </div>
                <div className="m-6 font-bold text-center" >コメント</div>
            <div>「この投稿には、人々が日常で感じた感謝や<></>思いやりの行動が多く含まれています。特に、手紙やプレゼントを通じた感謝の表現が印象的です。また、投稿者同士の絆や楽しい時間を共有する様子から、ポジティブなコミュニティの雰囲気が感じられます。」</div>

      

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GeminiButton;
