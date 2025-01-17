"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { createEngine } from "./utils/matterEngine";
import { createGround, createBallsByGroups, addBodiesToWorld, createWallleft, createWallright} from "./utils/matterBodies";
import { createCanvasOverlayAnimation } from "./utils/AnimationOverlay";
import { dummyPosts } from "../data/dummyData";
import { groupList } from "../data/groupData";

import DataModal from "./components/dataModal";
import Matter from "matter-js";
import Header from "../components/Header";

// Matter.Body の型を拡張
declare module "matter-js" {
  interface Body {
    customText?: string; // カスタムプロパティを追加
  }
}

const MatterScene = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉状態を管理
  const [selectedGroup, setSelectedGroup] = useState({
    groupName: "",
    groupId: 0,
  });

 // ページを再読み込みする関数
  const reloadPage = () => {
    window.location.reload();
  };

  // モーダルを閉じる関数
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  

  useEffect(() => {
    // 物理エンジンとレンダラーを作成
    const { engine, render } = createEngine();

    // 床と壁を作成
    const ground = createGround();
    const wallleft = createWallleft();
    const wallright = createWallright();
    const balls = createBallsByGroups(dummyPosts);

     // ボールごとにカスタムテキストを設定
     balls.forEach((ball, index) => {
      const group = groupList[index % groupList.length]; // groupList からデータを取得
      ball.customText = group.name; // ボールにグループ名を設定
    })

    // 物体をワールドに追加
    addBodiesToWorld(engine, [ground, wallleft, wallright, ...balls]);

    // Matter.js のカスタムレンダラーを設定
    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context; // Canvas のコンテキストを取得
      balls.forEach((ball) => {
        if (ball.customText) {
          ctx.font = "14px --font-Zen-Go"; // フォント設定
          ctx.fillStyle = "#000"; // テキストの色
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(ball.customText, ball.position.x, ball.position.y); // ボールの中心に描画
        }
      });
    });

    

   


    // オーバーレイ用キャンバスを追加
    const overlayCanvas = document.createElement("canvas");
    overlayCanvas.id = "overlay-canvas";
    overlayCanvas.width = 375;
    overlayCanvas.height = 400;
    overlayCanvas.style.position = "absolute";
    overlayCanvas.style.top = "0";
    overlayCanvas.style.left = "0";
    overlayCanvas.style.pointerEvents = "none";
    document.getElementById("canvas-area")!.appendChild(overlayCanvas);




    

    // ボールクリックイベントを設定
    render.canvas.addEventListener("mousedown", (event) => {
      const rect = render.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // クリックされたボールを特定
      const clickedBall = balls.find((ball) => {
        const dx = ball.position.x - x;
        const dy = ball.position.y - y;
        return Math.sqrt(dx * dx + dy * dy) < (ball.circleRadius || 0);
      });

      if (clickedBall) {
        // クリックされたボールに関連する情報を取得
        const color = clickedBall.render.fillStyle || "#FFFFFF";
        const group = groupList.find((g) => g.color === color); // groupListからgroupを取得

        if (group) {
          setSelectedGroup({
            groupName: group.name,
            groupId: group.id, // 修正：正しいIDを設定
          });

          // モーダルを遅れて開く
          setTimeout(() => {
            setIsModalOpen(true); // モーダルを開く
          }, 1000); // 500ms 待機（時間を調整）
        }

        // ボールに一時的な力を加える
        Matter.Body.applyForce(
          clickedBall,
          { x: clickedBall.position.x, y: clickedBall.position.y }, // 力を加える位置（ボールの中心）
          { x: 0, y: -0.5 } // 力のベクトル（上方向に押し上げる）
        );

        // 少し遅れて背景画像のアニメーションを開始
        setTimeout(() => {
          createCanvasOverlayAnimation("overlay-canvas", x, y, color);
        }, 300); // 300ms 待機
      }
    });

    

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center relative">
      {/* ヘッダー */}
      <Header />
      <h1>Matter.js Sample</h1>
      <div
        id="canvas-area" // 物理シミュレーションの描画エリア
        style={{
          width: "375px", // 描画領域の幅
          height: "370px", // 描画領域の高さ
          margin: "0 auto", // 中央揃え
          backgroundColor: "#f0f0f0", // 背景色
          position: "relative", // オーバーレイキャンバスを重ねるためのポジション指定
        }}
      ></div>

            {/* ページ再読み込みボタン */}
      <button
        onClick={reloadPage}
        className="mt-8 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
      >
        ページを再読み込み
      </button>

      {/* データモーダル */}
      <DataModal
        isOpened={isModalOpen}
        onClose={closeModal}
        groupId={selectedGroup.groupId} // 修正：変数を直接渡す
        groupName={selectedGroup.groupName} // 修正：変数を直接渡す
      />
    </div>
  );
};

export default MatterScene;
