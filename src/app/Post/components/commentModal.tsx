import React, { useState, useEffect } from "react";
import { Modalright } from "../../components/modalright";
import { Comment, Post } from "../../components/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { createClient } from "../../utils/supabase/client";
import { comment } from "postcss";
import { count } from "console";

type CommentModalProps = {
  postId: number | null;
  onClose: () => void;
};

const CommentModal: React.FC<CommentModalProps> = ({ postId, onClose }) => {
  const [newCommentContent, setNewCommentContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  // ユーザーIDを取得
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }
      setUserId(user?.id || null);
    };

    fetchUser();
  }, []);

  // 投稿を取得
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("post_id", postId)
        .single();

      if (error) {
        console.error("Error fetching post:", error.message);
        return;
      }

      setPost(data);
    };

    fetchPost();
  }, [postId]);

  // コメントを取得
  useEffect(() => {
    const fetchComments = async () => {
      if (!postId) return;

      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching comments:", error.message);
        return;
      }

      setComments(data || []);
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    try {
      setError(null);

      if (!userId || !postId || newCommentContent.trim() === "") {
        setError("コメントを入力してください");
        return;
      }

      // 現在のタイムスタンプを取得
      const created_at = new Date().toISOString();

      const newComment = {
        post_id: postId,
        user_id: userId, // userid から user_id に修正
        text: newCommentContent.trim(),
        likes: 0,
        created_at: created_at,
      };

      const { data, error } = await supabase
        .from("comments")
        .insert([newComment])
        .select();

      if (error) {
        console.error("Error adding comment:", error.message);
        setError(error.message);
        return;
      }

      if (data && data[0]) {
        // 新しいコメントを追加
        setComments((prev) => [...prev, data[0]]);
        setNewCommentContent("");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("予期せぬエラーが発生しました");
    }
  };

  if (postId === null) return null;

  // 投稿が見つからない場合
  if (!post) {
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
      <div className="flex flex-col items-center mt-12">
        {/* 投稿タイトルと内容を表示 */}
        <div
          className="m-2 bg-white w-[345px] rounded-lg shadow-md border-2 font-bold border-pink-dark
        "
        >
          <div className="pl-4 pt-3 text-xs">{post.title}</div>
          <div className="pl-4 pt-3 pb-3">{post.content}</div>
        </div>

        <h2 className="text-sm mt-4 mb-2 font-semibold">コメント</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {comments.length > 0 ? (
          <div className="bg-white rounded-lg p-4 w-[345px]">
            {comments.map((comment, index) => (
              <div
                key={comment.comment_id}
                className={`px-2 pt-2 mb-4 flex flex-row border-b-gray-300 ${
                  comments.length > index + 1 && "border-b-[1px] pb-4"
                } `}
              >
                <div className="text-xs w-[250px]">{comment.text}</div>
                <div className="text-right text-xs text-gray-500">
                  <FontAwesomeIcon icon={faHeart} className="mr-2" />
                  {comment.likes}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            コメントはまだありません。
          </div>
        )}

        <div className="flex flex-row items-center fixed bottom-4">
          <input
            className="w-[300px] h-8 p-2 border rounded m-1"
            placeholder="コメントを入力してください"
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
          />
          <button
            className="w-[50px] h-8 bg-pink-dark text-white text-xs font-bold text-center items-center rounded "
            onClick={handleAddComment}
          >
            <p>送信</p>
          </button>
        </div>
      </div>
    </Modalright>
  );
};

export default CommentModal;
