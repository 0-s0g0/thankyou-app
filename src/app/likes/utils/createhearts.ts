import Matter from "matter-js";
import { countPostsByGroup } from "../../data/utils/Getdummydata";
import { groupList } from "../../data/groupData";

// Matter.Body の型を拡張
declare module "matter-js" {
  interface Body {
    customText?: string;
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////

// 床を作成する関数
export const createGround = () => {
  // Bodies モジュールから物体を作成する関数を取得
  const { Bodies } = Matter;
  return Bodies.rectangle(190, 370, 380, 10, { isStatic: true ,render:{fillStyle:'#fffff'}});// （床）を作成(床の中心(X,Y),床の横幅,高さ,静的 )
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


///////////////////////////////////////////////////////////////////////////////////////////////

// グループ番号に対応するカラーを取得する関数
const getGroupColor = (group: number): string => {
  const groupIndex = group - 1;
  return groupList[groupIndex]?.color || "#000000";
};

// ハート形状の SVG パスを定義
const heartPath = `M 0 -40 C -25 -60, -50 -25, 0 40 C 50 -25, 25 -60, 0 -40 Z`;

// グループ数と投稿数に基づいてハートを生成する関数
export const createHeartsByGroups = (posts: { group: number }[]): Matter.Body[] => {
  const { Bodies, Vertices } = Matter;

  const groupCounts = countPostsByGroup(posts);

  const hearts = Object.entries(groupCounts).map(([group, count]) => {
    const groupNumber = parseInt(group, 10);

    // ハート形状の頂点を生成
    const body = Bodies.rectangle(0, 0, 1, 1); // 空のボディを作成
    const vertices = Vertices.fromPath(heartPath, body);

    // ハート形状のサイズをスケーリング
    const scale = 0.5 + count * 0.05;
    const scalePoint = { x: 0, y: 0 }; // 中心を基準にスケーリング
    Vertices.scale(vertices, scale, scale, scalePoint);

    // ハート形状のボディを作成
    const heart = Bodies.fromVertices(
      Math.random() * 300 + 50, // x座標
      Math.random() * 100 + 50, // y座標
      [vertices], // 配列でラップする
      {
        restitution: 0.9,
        render: {
          fillStyle: getGroupColor(groupNumber),
        },
      }
    );

    heart.customText = "❤"; // カスタムプロパティとして絵文字を追加
    return heart;
  });

  return hearts;
};

// Matter.js のカスタム描画で絵文字を描画
export const renderCustomText = (render: Matter.Render, hearts: Matter.Body[]) => {
  Matter.Events.on(render, "afterRender", () => {
    const ctx = render.context;
    hearts.forEach((heart) => {
      if (heart.customText) {
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(heart.customText, heart.position.x, heart.position.y);
      }
    });
  });
};

// 物体をワールドに追加する関数
export const addBodiesToWorld = (engine: Matter.Engine, bodies: Matter.Body[]) => {
  const { World } = Matter;
  World.add(engine.world, bodies);
};
