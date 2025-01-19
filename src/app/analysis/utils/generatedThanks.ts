import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini APIの初期化 (環境変数からAPIキーを取得)
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

// 生成されるテキストのインターフェース
export interface thanksText {
  thankYouMessage: string; // 生成された感謝のメッセージ
}

/**
 * ユーザーからの情報を基に感謝のメッセージを生成する関数
 * @param userInput - ユーザーからの入力情報（例：誕生日、お菓子作り）
 * @returns 生成された感謝のメッセージを含むオブジェクト
 */
export async function generateThankYouMessage(userInput: string): Promise<thanksText> {
  // プロンプトの定義: ユーザーの入力情報に基づいて感謝のメッセージを生成
  const prompt = `
    以下の情報に基づいて、感謝のメッセージを生成してください：
    入力内容: ${userInput}

    出力例:
    「ありがとう！${userInput}に感謝しています。あなたの優しさに心から感謝しています。」  

  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const response = await model.generateContent(prompt);

    const thankYouMessage = response.response.text().trim();

    return {
      thankYouMessage,
    };
  } catch (error) {
    console.error("感謝のメッセージ生成中にエラーが発生しました:", error);

    // エラー時のフォールバックメッセージ
    return {
      thankYouMessage: "ありがとうございます！あなたの優しさに感謝しています。",
    };
  }
}
