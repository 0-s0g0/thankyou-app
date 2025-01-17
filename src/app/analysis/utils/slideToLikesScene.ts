// utils/slideToLikesScene.ts
import Matter from "matter-js";

// ハートのオブジェクトを降らせる関数
export const createHearts = (engine: Matter.Engine, posts: any[], canvasWidth: number, canvasHeight: number) => {
  const hearts = posts.map((post) => {
    // ハートオブジェクトの作成
    const heart = Matter.Bodies.circle(
      Math.random() * canvasWidth, // ランダムなX位置
      0, // Y位置を0に設定して上から降らせる
      20, // ハートのサイズ
      { restitution: 0.8, render: { fillStyle: "#FF0000" } } // ハートの色と弾力を設定
    );
    heart.customText = "❤️"; // ハートマークを設定

    // ハートを物理エンジンのワールドに追加
    Matter.World.add(engine.world, heart);

    return heart;
  });

  return hearts;
};

// スライドアニメーションを実行する関数
export const slideCanvasToLikes = (canvasElement: HTMLElement, setCanvasSlide: Function) => {
  canvasElement.style.transition = "transform 1s ease-out";
  canvasElement.style.transform = "translateX(-100%)"; // 左にスライド
  setCanvasSlide(true); // スライドが完了した状態を更新
};
