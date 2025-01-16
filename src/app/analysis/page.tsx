"use client";

import { useEffect, useState } from "react";
import { createHearts, slideCanvasToLikes } from "./utils/slideToLikesScene"; // 新しい関数をインポート

import { createEngine } from "./utils/matterEngine";
import {createCanvasOverlayAnimation} from "./utils/AnimationOverlay"
import { createGround, createBallsByGroups, addBodiesToWorld, createWallleft, createWallright } from "./utils/matterBodies";
import { dummyPosts } from "../data/dummyData";
import{groupList} from "../data/groupData";

import DataModal from "./components/dataModal";
import Matter from "matter-js";
import Header from "../components/Header";

// Matter.Body の型を拡張
declare module "matter-js" {
  interface Body {
    customText?: string;
  }
}

const MatterScene = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({
    groupName: "",
    groupId: 0,
  });
  const [canvasSlide, setCanvasSlide] = useState(false); // スライド状態を管理
  const [newCanvasVisible, setNewCanvasVisible] = useState(false); // 新しいキャンバスの表示状態
  const [hearts, setHearts] = useState<Matter.Body[]>([]); // ハートを保持する状態を追加

  // モーダルを閉じる関数
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const reloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    const { engine, render } = createEngine();
    const ground = createGround();
    const wallleft = createWallleft();
    const wallright = createWallright();
    const balls = createBallsByGroups(dummyPosts);

    balls.forEach((ball, index) => {
      const group = groupList[index % groupList.length];
      ball.customText = group.name;
    });

    addBodiesToWorld(engine, [ground, wallleft, wallright, ...balls]);

    // Matter.js のレンダリング後に実行される処理
    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context;

      // ボールのテキスト描画
      balls.forEach((ball) => {
        if (ball.customText) {
          ctx.font = "14px --font-Zen-Go";
          ctx.fillStyle = "#000";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(ball.customText, ball.position.x, ball.position.y);
        }
      });

      // ハートの描画
      hearts.forEach((heart) => {
        if (heart.customText) {
          ctx.font = "20px Arial";
          ctx.fillStyle = "#FF0000";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(heart.customText, heart.position.x, heart.position.y);
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

      const clickedBall = balls.find((ball) => {
        const dx = ball.position.x - x;
        const dy = ball.position.y - y;
        return Math.sqrt(dx * dx + dy * dy) < (ball.circleRadius || 0);
      });

      if (clickedBall) {
        const color = clickedBall.render.fillStyle || "#FFFFFF";
        const group = groupList.find((g) => g.color === color);

        if (group) {
          setSelectedGroup({
            groupName: group.name,
            groupId: group.id,
          });
          setTimeout(() => {
            setIsModalOpen(true);
          }, 1000);
        }

        Matter.Body.applyForce(clickedBall, { x: clickedBall.position.x, y: clickedBall.position.y }, { x: 0, y: -0.5 });

        setTimeout(() => {
          createCanvasOverlayAnimation("overlay-canvas", x, y, color);
        }, 300);
      }
    });

    // ハート型オブジェクトを降らせる処理
    if (newCanvasVisible) {
      const newHearts = createHearts(engine, dummyPosts, 375, 400); // ハートの降下を開始
      setHearts(newHearts); // 新しいハートを保存
    }

  }, [newCanvasVisible, hearts]);

  const handleLikesButtonClick = () => {
    // 最初のキャンバスをスライドさせて新しいキャンバスを表示
    const canvasElement = document.getElementById("canvas-area")!;
    setCanvasSlide(true); // キャンバスのスライドを開始
    setTimeout(() => {
      setNewCanvasVisible(true); // 新しいキャンバスを表示
    }, 1000); // スライド後に新しいキャンバスを表示
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center relative">
      <Header />
      <button
        onClick={handleLikesButtonClick}
        className="mt-8 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
      >
        likesへ
      </button>

      <h1>Matter.js Sample</h1>

      {/* 最初のキャンバス部分 */}
      <div
        id="canvas-area"
        style={{
          width: "375px",
          height: "370px",
          margin: "0 auto",
          backgroundColor: "#f0f0f0",
          position: "relative",
          transition: "transform 1s ease-out", // スライドのアニメーション
          transform: canvasSlide ? "translateY(100%)" : "translateY(0)", // キャンバスを下にスライド
        }}
      ></div>

      {/* 新しいキャンバス部分 */}
      {newCanvasVisible && (
        <div
          id="new-canvas-area"
          style={{
            width: "375px",
            height: "370px",
            margin: "0 auto",
            backgroundColor: "#f0f0f0",
            position: "relative",
            transition: "transform 1s ease-out", // スライドのアニメーション
            transform: "translateY(0)", // 新しいキャンバスを表示
          }}
        ></div>
      )}

      <button
        onClick={reloadPage}
        className="mt-8 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
      >
        ページを再読み込み
      </button>

      <DataModal
        isOpened={isModalOpen}
        onClose={closeModal}
        groupId={selectedGroup.groupId}
        groupName={selectedGroup.groupName}
      />
    </div>
  );
};

export default MatterScene;