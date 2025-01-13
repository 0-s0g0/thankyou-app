import React, { useState } from 'react';
import { Modalright } from '../../components/modalright';
import { Comment,Post } from '../../components/types';
import { dummyComments,dummyPosts } from '../../data/dummyData';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

type CommentModalProps = {
  postId: number | null;
  onClose: () => void;
};

const CommentModal: React.FC<CommentModalProps> = ({ postId, onClose}) => {
  const [newCommentContent, setNewCommentContent] = useState('');
  if (postId === null) return null;

  // コメントを取得
  const comments = dummyComments.filter((comment) => comment.postid === postId);
  const posts = dummyPosts.find((post) => post.postid === postId);

  const handleAddComment = () => {
    if (newCommentContent.trim() === '') return; // 空の投稿を防ぐ
    setNewCommentContent('');
    onClose();
  };


  // 投稿が見つからない場合、モーダルを表示しない
  if (!posts) {
    return (
     <Modalright isOpened={true} setIsOpened={onClose}>
       <div className="flex flex-col items-center mt-16">
       <div className="text-sm text-red-500">投稿が見つかりません。</div>
       </div>
     </Modalright>
    );
  }

  return (
    <Modalright isOpened={true} setIsOpened={onClose}>
      
      <div className="flex flex-col items-center mt-16">


       {/* 投稿タイトルと内容を表示 */}
      <div className="m-2 bg-slate-100 w-[350px]">
          <div className="pl-4 pt-3 text-xs">{posts.title}</div>
          <div className="pl-4 pt-3 pb-3">{posts.content}</div>
      </div>
      


        <h2 className="text-xl mb-4">コメント一覧</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.commentId} className="bg-white p-2 mb-4 w-[300px] rounded-lg shadow-md flex flex-row">
              <div className="text-xs w-[250px]">{comment.text}</div>
              <div className="text-right text-xs text-gray-500 ">
                <FontAwesomeIcon icon={faHeart} className="mr-2"/>{comment.likes}</div>
              </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">コメントはまだありません。</div>
        )}

        <div className="flex flex-row items-center fixed bottom-2">
          <input
            className="w-[300px] p-2 border rounded m-1"
            placeholder="コメントを入力してください..."
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
          />
          <button
            className=" w-[50px] h-[35px] bg-pink-dark text-white rounded px-4 py-2"
            onClick={handleAddComment}
          >
            OK
          </button>
        </div>
        


      </div>
    </Modalright>
  );
};

export default CommentModal;
