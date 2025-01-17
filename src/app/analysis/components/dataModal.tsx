// components/NewPostModal.tsx
import React, { useState } from 'react';
import { Modalcanvas } from '../../components/modalcanvas';
import { getTotalPostsByGroup,  getTotalLikesByGroup, getTotalUsersByGroup} from  "../../data/utils/Getdummydata";
import { dummyPosts } from '@/app/data/dummyData';
import styles from '../css/analysis.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHeart, faComments} from "@fortawesome/free-solid-svg-icons";

type dataModalProps = {
  isOpened: boolean;
  onClose: () => void;
  groupName:string;
  groupId:number;
};

const DataModal: React.FC<dataModalProps> = ({ isOpened, onClose,groupName,groupId}) => {

    const totalLikes= getTotalLikesByGroup(dummyPosts, groupId);
    const totalPosts= getTotalPostsByGroup(dummyPosts, groupId);
    const totalUsers= getTotalUsersByGroup(dummyPosts, groupId);

  return (
    <Modalcanvas isOpened={isOpened} setIsOpened={onClose}>
      <div className="mt-16 flex flex-col items-center animate-fade-in-right ">
        <div className={styles.box19}>{groupName}</div>
        <div className="mt-8 h-[120px] flex flex-row gap-2">
          <div className="flex flex-col bg-white  items-center rounded-lg h-[160px] w-[110px] p-3">
            <FontAwesomeIcon icon={faUsers} className="w-12 h-12 text-blue-300" />
            <h3 className="text-3xl p-3 font-bold text-blue-600">{ totalUsers}</h3>
            <h3 className="text-sm">総ユーザー数</h3>
          </div>
          <div className="flex flex-col bg-white  items-center rounded-lg h-[160px] w-[110px] p-3">
            <FontAwesomeIcon icon={faHeart} className="w-12 h-12 text-pink-300" />
            <h3 className="text-3xl p-3 font-bold text-pink-600">{ totalLikes}</h3>
            <h3 className="text-sm">総いいね数</h3>
          </div>
          <div className="flex flex-col bg-white  items-center rounded-lg h-[160px] w-[110px] p-3">
            <FontAwesomeIcon icon={faComments} className="w-12 h-12 text-green-300" />
            <h3 className="text-3xl p-3 font-bold text-green-600">{ totalPosts}</h3>
            <h3 className="text-sm">総投稿数</h3>
          </div>
        </div>
      </div>
    </Modalcanvas>
  );
};

export default DataModal;
