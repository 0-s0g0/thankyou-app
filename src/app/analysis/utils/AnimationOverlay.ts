export const createCanvasOverlayAnimation = (canvasId: string, startX: number, startY: number, color: string) => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;
  
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  
    let radius = 0; // 円の初期半径
    const maxRadius = Math.max(canvas.width, canvas.height) * 1.5; // 最大半径をキャンバス全体の大きさに設定
  
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア
      ctx.fillStyle = color; // 塗りつぶしの色を設定
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
  