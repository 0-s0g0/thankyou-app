// src/utils/matterBodies.ts
import Matter from 'matter-js';

// 床のボディを作成する関数
export const createGround = () => {
  // Bodies モジュールから物体を作成する関数を取得
  const { Bodies } = Matter;
  return Bodies.rectangle(190, 240, 380, 10, { isStatic: true });// （床）を作成(床の中心(X,Y),床の横幅,高さ,静的 )
};

export const createWallleft = () => {
    // Bodies モジュールから物体を作成する関数を取得
    const { Bodies } = Matter;
    return Bodies.rectangle(5, 120, 10, 240, { isStatic: true,render:{fillStyle:'#db7093'}  });// （床）を作成(床の中心(X,Y),床の横幅,高さ,静的 )
  };

export const createWallright = () => {
    // Bodies モジュールから物体を作成する関数を取得
    const { Bodies } = Matter;
    return Bodies.rectangle(370, 120, 10, 240, { isStatic: true,render:{fillStyle:'#db7093'}  });// （床）を作成(床の中心(X,Y),床の横幅,高さ,静的 )
  };

// ボールのボディを作成する関数
export const createBall1 = () => {
  const { Bodies } = Matter;// Bodies モジュールから物体を作成する関数を取得
  return Bodies.circle(150, 10, 20, { restitution: 0.8,render:{fillStyle:'#db7093'}  }); // （ボール）を作成(ボールの中心(X,Y),ボールの半径,ボールの反発力,静的 )
};

// ボールのボディを作成する関数
export const createBall2 = () => {
    const { Bodies } = Matter;// Bodies モジュールから物体を作成する関数を取得
    return Bodies.circle(180, 30, 60, { restitution: 0.8,render:{fillStyle:'#8fbc8f'}  }); // （ボール）を作成(ボールの中心(X,Y),ボールの半径,ボールの反発力,静的 )
  };

// ボールのボディを作成する関数
export const createBall3 = () => {
    const { Bodies } = Matter;// Bodies モジュールから物体を作成する関数を取得
    return Bodies.circle(100, 90, 70, { restitution: 0.8,render:{fillStyle:'#6495ed'}  }); // （ボール）を作成(ボールの中心(X,Y),ボールの半径,ボールの反発力,静的 )
  };

// 物体をワールドに追加する関数
export const addBodiesToWorld = (engine: Matter.Engine, bodies: Matter.Body[]) => {
  const { World } = Matter;// World モジュールをインポート（ワールドに物体を追加するため）
  World.add(engine.world, bodies);// 指定した物体をエンジンのワールドに追加
};
