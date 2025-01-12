'use client'
import { useState } from "react";
import { Modal } from "../components/modal";

//icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";

type Post = {
  userid: number;//ユーザーid
  postid: number;//ポストid
  title: string;//投稿タイトル
  content: string;//投稿内容
  likes: number;//いいね数
  coments: number;//コメント数
};

const PostPage = () => {
    const [posts, setPosts] = useState<Post[]>([
      { userid: 1, postid:1, title: "投稿1", content: "これは匿名の投稿1です。", likes: 3, coments: 2 },
      {  userid: 2, postid:2, title: "投稿2", content: "これは匿名の投稿2です。", likes: 5, coments: 1},
    ]);
    const [newPostTitle, setNewPostTitle] = useState(""); // 新しい投稿の内容を管理
    const [newPostContent, setNewPostContent] = useState(""); // 新しい投稿の内容を管理
    const [isOpened, setIsOpened] = useState(false);
  
    const handleLike = (id: number) => {
      setPosts((prev) =>
        prev.map((post) =>
          post.postid === id ? { ...post, likes: post.likes + 1 } : post,//いいねしたら1増える
        )
      );
    };
  
    const handleSave = (id: number) => {
      setPosts((prev) =>
        prev.map((post) =>
          post.coments === id ? { ...post, coments: post.coments + 1 } : post//コメントしたら
        )
      );
    };
  
    const handleAddPost = () => {
      if (newPostContent.trim() === "") return; // 空の投稿を防ぐ
      const newPost: Post = {
        userid: posts.length + 1, // IDを適当に
        postid: posts.length + 1, // IDを適当に
        title:newPostTitle,
        content: newPostContent,
        likes: 0,
        coments: 0,
      };
      setPosts((prev) => [newPost, ...prev]); // 新しい投稿を先頭に追加
      setNewPostContent(""); // 入力フィールドをリセット
      setIsOpened(false); // モーダルを閉じる
    };
  
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        {/* モーダル */}
        <Modal isOpened={isOpened} setIsOpened={setIsOpened}>
          <div className="flex flex-col items-center">
            <h2 className="m-8 text-xl mb-4">ありがとうを伝える</h2>
            <input
              className="w-[380px] p-2 border rounded m-1"
              placeholder="タイトルを入力してください..."
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <textarea
              className="w-[380px] p-2 border rounded m-8"
              rows={4}
              placeholder="内容を入力してください..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-pink-dark text-white rounded px-4 py-2"
                onClick={handleAddPost}
              >
                投稿する
              </button>
            </div>
          </div>
        </Modal>
  
        {/* 投稿一覧 */}
        <div className="flex-1 p-4">
          {posts.map((post) => (
            <div key={post.postid} className="bg-pink-light p-2 mb-4 rounded-lg shadow-md w-[380px]" >
              <div className="m-2 bg-slate-100">
                 <div className="pl-4 pt-3 text-xs">{post.title}</div>
                 <div className="pl-4 pt-3 pb-3">{post.content}</div>
              </div>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleLike(post.postid)}
                  className="ml-4"
                >
                  <FontAwesomeIcon icon={faHeart} className="mr-2"/>{post.likes}
                </button>
                <button
                  onClick={() => handleSave(post.postid)}
                  className="ml-4"
                >
                  <FontAwesomeIcon icon={faComment} className="mr-2"/>{post.coments}
                </button>
              </div>
            </div>
          ))}
        </div>
  
        {/* フッターボタン */}
        <div className="fixed bottom-0 w-[380px] p-4 bg-white shadow-md flex justify-center">
          <button
            className="bg-blue-500 text-white rounded-full p-4 shadow-lg"
            onClick={() => setIsOpened(true)}
          >
            ＋
          </button>
        </div>
      </div>
    );
  };
  
export default PostPage;