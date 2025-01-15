// src/utils/matterBodies.ts
import Matter from 'matter-js';
import {countPostsByGroup} from "../../data/utils/Getdummydata"
import {groupList} from "../../data/groupData"

// 床を作成する関数
export const createGround = () => {
  // Bodies モジュールから物体を作成する関数を取得
  const { Bodies } = Matter;
  return Bodies.rectangle(190, 370, 380, 10, { isStatic: true ,render:{fillStyle:'#f0f0f0'}});// （床）を作成(床の中心(X,Y),床の横幅,高さ,静的 )
};
// 左の壁を作成する関数
export const createWallleft = () => {
    const { Bodies } = Matter;
    return Bodies.rectangle(5, 140, 10, 370, { isStatic: true,render:{fillStyle:'#f0f0f0'}  });// （壁）を作成(床の中心(X,Y),床の横幅,高さ,静的 )
  };

// 右の壁を作成する関数
export const createWallright = () => {
    const { Bodies } = Matter;
    return Bodies.rectangle(370, 140, 10, 370, { isStatic: true,render:{fillStyle:'#f0f0f0'}  });// （壁）を作成(床の中心(X,Y),床の横幅,高さ,静的 )
  };

//////////////////////////////////////////////////////////////////////////////



// グループ番号に対応するカラーを取得する関数
const getGroupColor = (group: number) => {
    const groupIndex = group - 1; // グループ番号は1から始まるので、配列インデックス調整
    return groupList[groupIndex]?.color || "#000000"; // 該当なしの場合は黒
};
  

  // グループ数と投稿数に基づいてボールを生成する関数
  export const createBallsByGroups = (posts: { group: number }[]) => {
    const { Bodies } = Matter;
  
    // グループごとの投稿数を取得
    const groupCounts = countPostsByGroup(posts);
  
    // グループごとにボールを作成
    const balls = Object.entries(groupCounts).map(([group, count]) => {
        const groupNumber = parseInt(group, 10);
      const radius = 55 + count * 5; // 投稿数に応じて半径を設定（基本10 + 投稿数 × 5）
      return Bodies.circle(
        Math.random() * 300 + 50, // X座標をランダムに設定
        Math.random() * 100 + 50, // Y座標をランダムに設定
        radius, // 半径
        {
          restitution: 0.9, // 弾力性
          render: {
            fillStyle: getGroupColor(groupNumber), // グループに対応する色を設定
          },
        }
      );
    });
  
    return balls;
  };
  


///////////////////////////////////////////////////////////////////////////////

// 物体をワールドに追加する関数
export const addBodiesToWorld = (engine: Matter.Engine, bodies: Matter.Body[]) => {
  const { World } = Matter;// World モジュールをインポート（ワールドに物体を追加するため）
  World.add(engine.world, bodies);// 指定した物体をエンジンのワールドに追加
};
