// components/NewPostModal.tsx
import React, { useState } from "react";
import { Modal } from "../../components/modal";

type NewPostModalProps = {
  isOpened: boolean;
  onClose: () => void;
  onAddPost: (title: string, content: string) => void;
};

const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpened,
  onClose,
  onAddPost,
}) => {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  const handleAddPost = () => {
    if (newPostContent.trim() === "") return; // 空の投稿を防ぐ
    onAddPost(newPostTitle, newPostContent);
    setNewPostTitle("");
    setNewPostContent("");
    onClose();
  };

  return (
    <Modal isOpened={isOpened} setIsOpened={onClose}>
      <div className="flex flex-col items-center justify-center">
        <h2 className="mt-16 text-xl mb-8 font-bold">"ありがとうを伝える"</h2>
        <input
          className="w-[355px] p-2 border rounded m-1"
          placeholder="タイトルを入力してください"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <textarea
          className="w-[355px] h-40 p-2 border rounded mt-2 mb-12"
          rows={4}
          placeholder="内容を入力してください"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-pink-dark text-white rounded px-6 py-2 font-bold shadow-md"
            onClick={handleAddPost}
          >
            投稿する
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewPostModal;
