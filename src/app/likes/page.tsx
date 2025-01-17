"use client";

import { useEffect, useState } from "react";

import { createEngine } from "../analysis/utils/matterEngine";
import { createGround,  createHeartsByGroups, addBodiesToWorld, createWallleft, createWallright } from "./utils/createhearts";
import { dummyPosts } from "../data/dummyData";
import{groupList} from "../data/groupData";

import Matter from "matter-js";
import Header from "../components/Header";
import { relative } from "path";

// Matter.Body の型を拡張
declare module "matter-js" {
  interface Body {
    customText?: string;
  }
}

const MatterScene = () => {
  const [selectedGroup, setSelectedGroup] = useState({
    groupName: "",
    groupId: 0,
  });

  // モーダルを閉じる関数
  const closeModal = () => {
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
    const hearts =  createHeartsByGroups(dummyPosts);

    hearts.forEach((ball, index) => {
      const group = groupList[index % groupList.length];
      ball.customText = group.name;
    });

    addBodiesToWorld(engine, [ground, wallleft, wallright, ...hearts]);

    // Matter.js のレンダリング後に実行される処理
    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context;

      // ボールのテキスト描画
      hearts.forEach((ball) => {
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

  }, []);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center relative">
      <Header />
      <button
        onClick={reloadPage}
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
          position:"relative"
        }}
      ></div>


      <button
        onClick={reloadPage}
        className="mt-8 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
      >
        ページを再読み込み
      </button>
    </div>
  );
};

export default MatterScene;