// components/NewPostModal.tsx
import React, { useState } from 'react';
import { Modalsent } from '../../components/modalsent';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import presentBox from "../../../../public/gift_color.png"
import Image from 'next/image';
import Styles from "./sentModal.module.css"

type sentModalProps = {
  isOpened: boolean;
  onClose: () => void;
};

const SentModal: React.FC<sentModalProps> = ({ isOpened, onClose}) => {
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const handleAddPost = () => {
    if (newPostContent.trim() === '') return; // 空の投稿を防ぐ
    setNewPostTitle('');
    setNewPostContent('');
    onClose();
  };

  return (
    <Modalsent isOpened={isOpened} setIsOpened={onClose}>
      <div className="flex flex-col items-center ">

      <h2 className={Styles.title1} >Birthday Message</h2>
      <div className='flex flex-row justify-center gap-3 items-center m-3'>
        <h2 className="text-xl z-30  bg-yellow-100 rounded-3xl p-2">step1</h2>
        <h2 className=" text-xl z-30  animate-tracking-in-expand">お祝いメッセージを入力</h2>
      </div>
      <input
          className="w-[270px] p-2 border rounded m-1 bg-white"
          placeholder="タイトルを入力してください..."
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          
        />
        <textarea
          className="w-[270px] p-2 border rounded m-8 mb-2"
          rows={4}
          placeholder="内容を入力してください..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />

          <button
            className="bg-yellow-100 rounded px-4 py-2"
            onClick={handleAddPost}
          >
            次へ
          </button>
      
        

        <div className="flex justify-end">

        </div>
      </div>
    </Modalsent>
  );
};

export default SentModal;
