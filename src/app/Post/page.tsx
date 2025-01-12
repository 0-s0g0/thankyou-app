'use client'
import { useState } from "react";
import { Modal } from "../components/modal";

type Post = {
  id: number;
  content: string;
  likes: number;
  saves: number;
};

const PostPage = () => {
    const [posts, setPosts] = useState<Post[]>([
      { id: 1, content: "これは匿名の投稿1です。", likes: 3, saves: 2 },
      { id: 2, content: "これは匿名の投稿2です。", likes: 5, saves: 1 },
    ]);
    const [newPostContent, setNewPostContent] = useState(""); // 新しい投稿の内容を管理
    const [isOpened, setIsOpened] = useState(false);
  
    const handleLike = (id: number) => {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id ? { ...post, likes: post.likes + 1 } : post
        )
      );
    };
  
    const handleSave = (id: number) => {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id ? { ...post, saves: post.saves + 1 } : post
        )
      );
    };
  
    const handleAddPost = () => {
      if (newPostContent.trim() === "") return; // 空の投稿を防ぐ
      const newPost: Post = {
        id: posts.length + 1, // IDをユニークにする
        content: newPostContent,
        likes: 0,
        saves: 0,
      };
      setPosts((prev) => [newPost, ...prev]); // 新しい投稿を先頭に追加
      setNewPostContent(""); // 入力フィールドをリセット
    };
  
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/*モーダル*/}
        <Modal isOpened={isOpened} setIsOpened={setIsOpened}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-4/5">
              <h2 className="text-xl font-bold mb-4">新しい投稿</h2>
              <textarea
                className="w-full p-2 border rounded mb-4"
                rows={4}
                placeholder="内容を入力してください..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white rounded px-4 py-2"
                  onClick={handleAddPost}
                >
                  投稿する
                </button>
              </div>
            </div>
          </div>
        
        </Modal>
        {/* 投稿一覧 */}
        <div className="flex-1 p-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 mb-4 rounded shadow-md"
            >
              <p>{post.content}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleLike(post.id)}
                  className="text-red-500 mr-4"
                >
                  ♥ {post.likes}
                </button>
                <button
                  onClick={() => handleSave(post.id)}
                  className="text-blue-500"
                >
                  💾 {post.saves}
                </button>
              </div>
            </div>
          ))}
        </div>
  
        {/* フッターボタン */}
        <div className="fixed bottom-0 w-full p-4 bg-white shadow-md flex justify-center">
          <button
            className="bg-blue-500 text-white rounded-full p-4 shadow-lg"
            onClick={() => setIsOpened(true)}
          >
            ＋
          </button>
        </div>
  
        {/* 投稿モーダル */}
        
      </div>
    );
  };
  
export default PostPage;