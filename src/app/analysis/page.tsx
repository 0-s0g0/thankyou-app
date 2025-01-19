"use client";

import { useEffect, useState } from "react";
import { createHearts, slideCanvasToLikes } from "./utils/slideToLikesScene"; // 新しい関数をインポート

import { createEngine } from "./utils/matterEngine";
import {createCanvasOverlayAnimation} from "./utils/AnimationOverlay"
import { createGround, createBallsByGroups, addBodiesToWorld, createWallleft, createWallright } from "./utils/matterBodies";
import { dummyPosts } from "../data/dummyData";
import{groupList} from "../data/groupData";
import GeminiButton from "./text/page"
import ThankYouPage from "./text/thanks"

import DataModal from "./components/dataModal";
import Matter from "matter-js";
import Header from "../components/Header";
import { relative } from "path";

import styles from './css/analysis.module.css'

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

  }, []);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center relative">
      <Header />
      <div className={styles.box18}>
        <p>About Groups</p>
      </div>

      {/* 最初のキャンバス部分 */}
      <div
        id="canvas-area"
        style={{
          width: "375px",
          height: "370px",
          margin: "0 auto",
          backgroundColor: "#f0f0f0",
          position:"relative"
        }}
      ></div>


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

      <div className={styles.box18}>
        <p>About Me</p>
      </div>

      <GeminiButton /> 
      <ThankYouPage />


    </div>
  );
};

export default MatterScene;