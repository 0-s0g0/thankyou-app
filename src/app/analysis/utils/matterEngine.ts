// src/utils/matterEngine.ts
import Matter from 'matter-js';

export const createEngine = () => {

  // Matter.js の必要なモジュールを抽出
  const { Engine, Render, Runner } = Matter;

  // Matter.js エンジンの生成
  const engine = Engine.create();

  // レンダラーの設定（画面に描画するための設定）
  const render = Render.create({
    element: document.getElementById('canvas-area')!,// 物理シミュレーションを描画するための要素
    engine: engine,// 使用するエンジンを指定
    options: {
      width: 375,// 描画領域の幅
      height: 240,// 描画領域の高さ
      wireframes: false, // ワイヤーフレーム（枠線）表示を無効に
      background: '#f0f0f0',  // 背景色を変更（ここで灰色に設定）
    },
  });

   // Matter.js のランナーの作成（物理エンジンを実行するための仕組み）
  const runner = Runner.create();
  // 物理エンジンをランナーで実行
  Runner.run(runner, engine);
  // レンダラーの実行（シーンを描画）
  Render.run(render);

  // エンジン、レンダラー、ランナーを返す
  return { engine, render, runner };
};
