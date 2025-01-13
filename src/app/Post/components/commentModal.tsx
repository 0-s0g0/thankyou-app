import React, { useState } from 'react';
import { Modalright } from '../../components/modalright';
import { Comment,Post } from '../../components/types';
import { dummyComments,dummyPosts } from '../../data/dummyData';

type CommentModalProps = {
  postId: number | null;
  onClose: () => void;
  onAddComment: (content: string) => void;
};

const CommentModal: React.FC<CommentModalProps> = ({ postId, onClose,onAddComment }) => {
  const [newCommentContent, setNewCommentContent] = useState('');
  if (postId === null) return null;

  // コメントを取得
  const comments = dummyComments.filter((comment) => comment.postid === postId);
  const posts = dummyPosts.find((post) => post.postid === postId);

  const handleAddPost = () => {
    if (newCommentContent.trim() === '') return; // 空の投稿を防ぐ
    onAddComment(newCommentContent);
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
            <div key={comment.commentId} className="bg-white p-2 mb-4 w-[300px] rounded-lg shadow-md ">
              <div className="text-xs">{comment.text}</div>
              <div className="text-right text-xs text-gray-500">{comment.likes} いいね</div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">コメントはまだありません。</div>
        )}

        <input
          className="w-[380px] p-2 border rounded m-1"
          placeholder="タイトルを入力してください..."
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
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
    </Modalright>
  );
};

export default CommentModal;
