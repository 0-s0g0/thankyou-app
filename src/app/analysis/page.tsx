"use client";
import { useEffect } from 'react';
import { createEngine } from './utils/matterEngine';
import { createGround, createBall1, createBall2,createBall3,addBodiesToWorld,createWallleft,createWallright } from './utils/matterBodies';

const MatterScene = () => {
  useEffect(() => {
    // 初回レンダリング時に実行される処理

    // 物理エンジンとレンダラーを作成
    const { engine, render } = createEngine();

    // 床とボールを作成
    const ground = createGround();
    const wallleft = createWallleft();
    const wallright = createWallright();
    const ball1 = createBall1();
    const ball2 = createBall2();
    const ball3 = createBall3();

    // 物体をワールドに追加
    addBodiesToWorld(engine, [ground, ball1, ball2, ball3,wallleft,wallright]);
  }, []);

  return (
    <>
      <h1>Matter.js Sample</h1>
      <div
        id="canvas-area" // 物理シミュレーションの描画エリア
        style={{
          width: '375px',// 描画領域の幅
          height: '240px',// 描画領域の高さ
          margin: '0 auto', // 中央揃え
          backgroundColor: '#fafad2',// 背景色
        }}
      ></div>
    </>
  );
};

export default MatterScene;
