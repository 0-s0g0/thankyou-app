// src/utils/matterBodies.ts
import Matter from 'matter-js';
import { createClient  } from '../../utils/supabase/client';

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
// グループ番号に対応する投稿数を取得する関数
const countPostsByGroup = async () => {
  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select('group_id');

  if (error) {
    console.error('Error fetching posts:', error);
    return {};
  }

  // グループごとの投稿数をカウント
  return posts.reduce((acc: { [key: string]: number }, post) => {
    const groupId = post.group_id.toString(); // groupを文字列に変換
    acc[groupId] = (acc[groupId] || 0) + 1;
    return acc;
  }, {});
};

// グループの色情報を取得する関数
export const getGroupColor = async (groupId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('groups')
    .select('description')
    .eq('id', groupId)
    .single();

  if (error || !data) {
    console.error('Error fetching group color:', error);
    return { color1: "#000000", color2: "#000000" }; // デフォルト色
  }

  return data.description as { color1: string; color2: string };
};

// ボールを生成する関数
export const createBallsByGroups = async () => {
  const { Bodies } = Matter;

  try {
    // グループごとの投稿数を取得
    const groupCounts = await countPostsByGroup();

    // ボールを作成
    const balls = await Promise.all(
      Object.entries(groupCounts).map(async ([groupId, count]) => {
        const colors = await getGroupColor(groupId);
        const radius = 30 + count * 5; // 投稿数に応じて半径を調整

        // グラデーションをCanvasで作成
        const canvas = document.createElement('canvas');
        const size = radius * 2;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          const gradient = ctx.createLinearGradient(0, 0, size, size);
          gradient.addColorStop(0, colors.color1);
          gradient.addColorStop(1, colors.color2);

          ctx.beginPath();
          ctx.arc(radius, radius, radius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // ボールをMatter.jsのBodyとして生成
        return Bodies.circle(
          Math.random() * 300 + 50, // X座標
          Math.random() * 100 + 50, // Y座標
          radius,
          {
            restitution: 0.9,
            render: {
              sprite: {
                texture: canvas.toDataURL(),
                xScale: 1,
                yScale: 1,
              },
            },
          }
        );
      })
    );

    return balls;

  } catch (error) {
    console.error('Error creating balls:', error);
    return [];
  }
};





  
  


///////////////////////////////////////////////////////////////////////////////

// 物体をワールドに追加する関数
export const addBodiesToWorld = (engine: Matter.Engine, bodies: Matter.Body[]) => {
  const { World } = Matter;// World モジュールをインポート（ワールドに物体を追加するため）
  World.add(engine.world, bodies);// 指定した物体をエンジンのワールドに追加
};
