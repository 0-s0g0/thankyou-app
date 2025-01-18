// components/NewPostModal.tsx
import React, { useState } from 'react';
import { Modalcelebrate} from '../../components/modalcelebrate';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import presentBox from "../../../../public/gift_color.png"
import Image from 'next/image';

type HPBModalProps = {
  isOpened: boolean;
  onClose: () => void;
};

const HPBModal: React.FC<HPBModalProps> = ({ isOpened, onClose}) => {
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const handleAddPost = () => {
    if (newPostContent.trim() === '') return; // 空の投稿を防ぐ
    setNewPostTitle('');
    setNewPostContent('');
    onClose();
  };

  return (
    <Modalcelebrate isOpened={isOpened} setIsOpened={onClose}>
      <div className="flex flex-col items-center ">

      <h2 className="m-8 text-6xl mb-0 bg-yellow-200 z-30 font-serif font-bold animate-tracking-in-expand">Happy</h2>
      <h2 className="m-8 text-6xl  bg-yellow-200 z-30 font-serif font-bold animate-tracking-in-expand ">birthday</h2>
      <Image src={presentBox} alt="" width={140} className='animate-bounce mt-10'/>
          <Confetti
            width={300}
            height={450}
            recycle={true}
          />
        

        <div className="flex justify-end">

        </div>
      </div>
    </Modalcelebrate>
  );
};

export default HPBModal;
