import { getGroupColor } from './matterBodies'; // getGroupColor のインポート

export const createCanvasOverlayAnimation = async (
  canvasId: string,
  startX: number,
  startY: number,
  groupId: string // グループIDを引数に追加
) => {
  // グループの色情報を取得
  const { color1, color2 } = await getGroupColor(groupId);

  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let radius = 0; // 円の初期半径
  const maxRadius = Math.max(canvas.width, canvas.height) * 1.5; // 最大半径をキャンバス全体の大きさに設定

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア

    // グラデーションを作成
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, color1); // color1を開始色に設定
    grad.addColorStop(1, color2); // color2を終了色に設定

    ctx.fillStyle = grad; // グラデーションを塗りつぶしの色として設定
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2); // 円を描画
    ctx.fill();

    radius += 10; // 半径を拡大
    if (radius < maxRadius) {
      requestAnimationFrame(animate); // 最大半径に達するまでアニメーションを続ける
    }
  };

  animate(); // アニメーションを開始
};
