// components/NewPostModal.tsx
import React, { useState } from "react";
import { Modalgemini } from "../../components/modalgemini";
import ThankYouPage from "../../analysis/text/thanks"

type GeminiModalProps = {
  isOpened: boolean;
  onClose: () => void;
  onAddPost: (title: string, content: string) => void;
};

const GeminiModal: React.FC<GeminiModalProps> = ({
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

  const handleAddGemeni=()=>{

  }

  return (
    <Modalgemini isOpened={isOpened} setIsOpened={onClose}>
     <ThankYouPage/>

    </Modalgemini>
  );
};

export default GeminiModal;
