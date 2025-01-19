"use client";

import React, { useState, useEffect } from "react";
import { generatePostText, PostContentText } from "../../analysis/utils/generateText";
import { getPosts } from "../../analysis/utils/fechComents";

export const GeminiButton: React.FC = () => {
  const [posts, setPosts] = useState<string[]>([]); // 投稿内容を保存する
  const [result, setResult] = useState<PostContentText | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Supabaseから投稿を取得
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      const contents = data.map((post: { content: string }) => post.content);
      setPosts(contents);
    };
    fetchPosts();
  }, []);

  // トレンド生成処理
  const handleGenerateText = async () => {
    if (posts.length === 0) {
      alert("投稿がありません！");
      return;
    }

    setLoading(true);
    try {
      // すべての投稿内容を結合
      const allContent = posts.join("\n");
      const generatedText = await generatePostText(allContent);
      setResult(generatedText);
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert("テキスト生成中にエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>投稿内容からトレンドを生成</h1>
      <button
        onClick={handleGenerateText}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "生成中..." : "生成する"}
      </button>
      <div style={{ marginTop: "20px" }}>
        {result && (
          <>
            <h2>生成された結果</h2>
            <p>
              <strong>ランキング:</strong>
              <br />
              {result.ranking}
            </p>
            <p>
              <strong>講評:</strong>
              <br />
              {result.reviewcontent}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default GeminiButton;
