// components/NewPostModal.tsx
import React, { useState } from 'react';
import { Modalcanvas } from '../../components/modalcanvas';
import { getTotalPostsByGroup,  getTotalLikesByGroup} from  "../../data/utils/Getdummydata";
import { dummyPosts } from '@/app/data/dummyData';

type dataModalProps = {
  isOpened: boolean;
  onClose: () => void;
  groupName:string;
  groupId:number;
};

const DataModal: React.FC<dataModalProps> = ({ isOpened, onClose,groupName,groupId}) => {

    const totalLikes= getTotalLikesByGroup(dummyPosts, groupId);
    const totalPosts= getTotalPostsByGroup(dummyPosts, groupId);

  return (
    <Modalcanvas isOpened={isOpened} setIsOpened={onClose}>
      <div className="mt-16 flex flex-col items-center animate-fade-in-right ">
        <h2 className="m-8 text-xl mb-4">{groupName}</h2>
        
        <h3 className="m-8 text-xl mb-4">いいね数{ totalLikes}</h3>
        <h3 className="m-8 text-xl mb-4">ポスト数{ totalPosts}</h3>
      </div>
    </Modalcanvas>
  );
};

export default DataModal;
