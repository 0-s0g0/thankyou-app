import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini APIの初期化 (環境変数からAPIキーを取得)
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

// 生成されるテキストのインターフェース
export interface PostContentText {
  ranking: string; // 上位3つのトレンドのランキング
  reviewcontent: string; // トレンドに対する全体的な講評
}

/**
 * 指定された投稿内容に基づいてテキストを生成する関数
 * @param postContent - テキストを生成する投稿内容
 * @returns 生成されたテキストを含むオブジェクト
 */
export async function generatePostText(postContent: string): Promise<PostContentText> {
  // プロンプトの定義: 投稿内容から重要なトレンドを抽出し、ランキング形式で上位3つのトレンドを表示
  const prompt = `
  以下の文章は複数の投稿内容から成るデータです。各投稿には、人々の「感謝」や「思いやり」の気持ちが込められています。

    この投稿内容を分析し、以下の情報を生成してください：
    1. 投稿全体で共通するトレンドを3つ挙げ、それらをランキング形式で表示してください。
      - 各トレンドを簡潔でわかりやすい言葉で表現してください。
      - トレンドは、頻出するキーワードや感情（例: 感謝、喜び、思いやり）を基に決定してください。
    
    2. これらのトレンドに対して1つの講評を生成してください。
     - 投稿全体の傾向や感じられるテーマを簡潔にまとめてください。
     - 感情や雰囲気、投稿者が伝えようとしているメッセージを反映した内容にしてください。

      投稿内容:
      """
      ${postContent}
      """

    出力形式:
    ランキング:
    1. トレンド1
    2. トレンド2
    3. トレンド3

    講評:
    「講評内容」

    もし、投稿数が少ないなど難しい場合は以下を表示してください
    /////////////////////////////////////////////////////
      1. 手紙
      2. 日常の中でのサポート
      3. 楽しい時間を共有するエピソード

    ///////////////////////////////////////////////////////
      「この投稿には、人々が日常で感じた感謝や思いやりの行動が多く含まれています。特に、手紙やプレゼントを通じた感謝の表現が印象的です。また、投稿者同士の絆や楽しい時間を共有する様子から、ポジティブなコミュニティの雰囲気が感じられます。」
     ////////////////////////////////////////////////////


  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const response = await model.generateContent(prompt);

    // 生成されたテキストを元にランキングと講評を取得
    const [ranking, reviewcontent] = response.response.text()
      .trim()
      .split("\n")
      .map((line) => line.trim());

    return {
      ranking,
      reviewcontent,
    };
  } catch (error) {
    console.error("テキスト生成中にエラーが発生しました:", error);

    // APIコール失敗時のフォールバックテキスト
    return {
      ranking: " ランキング: 1. 手紙 2. 日常の中でのサポート 3. 楽しい時間を共有するエピソード",
      reviewcontent: "「この投稿には、人々が日常で感じた感謝や思いやりの行動が多く含まれています。特に、手紙やプレゼントを通じた感謝の表現が印象的です。また、投稿者同士の絆や楽しい時間を共有する様子から、ポジティブなコミュニティの雰囲気が感じられます。」",
    };
  }
}
