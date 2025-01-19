"use client";
import { useState, useEffect } from "react";
import { createClient } from "../utils/supabase/client"; // Supabaseクライアント
import { Post, Comment } from "../components/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { LikeButton } from "./components/HeartAnimation";
import { Modal } from "../components/modal";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommentModal from "./components/commentModal";
import NewPostModal from "./components/newPostModal";
import { handleLikeToggle } from "./utils/likes";

const PostPage = () => {
  const [posts, setPosts] = useState<Post[]>([]); // 初期値は空配列
  const [comments, setComments] = useState<Comment[]>([]); // コメントの状態を管理
  const [newPostTitle, setNewPostTitle] = useState(""); // 新しい投稿のタイトルを管理
  const [newPostContent, setNewPostContent] = useState(""); // 新しい投稿の内容を管理
  const [isOpened, setIsOpened] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null); // コメント表示用の投稿ID
  const [userId, setUserId] = useState<string | null>(null); // ユーザーID
  const [likes, setLikes] = useState(0); // 初期のいいね数

  const supabase = createClient();

  // ログイン中のユーザーを取得
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        return;
      }
      setUserId(data?.user?.id || null);
    };

    fetchUser();
  }, []);

  // 投稿データを取得
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("post_id", { ascending: false });
      if (error) {
        console.error("Error fetching posts:", error);
        return;
      }
      setPosts(data || []);
    };

    fetchPosts();
  }, [supabase]);

  // コメントデータを取得
  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase.from("comments").select("*");
      if (error) {
        console.error("Error fetching comments:", error);
        return;
      }
      setComments(data || []);
    };

    fetchComments();
  }, [supabase]);

  // 投稿を追加
  const handleAddPost = async (title: string, content: string) => {
    if (!userId || title.trim() === "" || content.trim() === "") return;

    const newPost = {
      user_id: userId,
      group_id: 3,
      title,
      content,
      likes: 0,
    };

    const { data, error } = await supabase
      .from("posts")
      .insert(newPost)
      .select();
    if (error) {
      console.error("Error adding post:", error.message);
      return;
    }

    setPosts((prev) => [data[0], ...prev]);
  };
  // いいねトグル処理
  const handleLike = async (id: number, currentLikes: number) => {
    const updatedLikes = await handleLikeToggle(userId, id, currentLikes);
    if (updatedLikes !== undefined) {
      setPosts((prev) =>
        prev.map((post) =>
          post.post_id === id ? { ...post, likes: updatedLikes } : post
        )
      );
    }
  };

  // コメント数を取得
  const getCommentCount = (postId: number) =>
    comments.filter((comment) => comment.post_id === postId).length;

  // コメントモーダルを開く
  const handleOpenComments = (postId: number) => {
    setSelectedPostId(postId);
  };

  // コメントモーダルを閉じる
  const handleCloseComments = () => {
    setSelectedPostId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* ヘッダー */}
      <Header />
      {/* 投稿モーダル */}
      <NewPostModal
        isOpened={isOpened}
        onClose={() => setIsOpened(false)}
        onAddPost={handleAddPost}
      />

      {/* 投稿一覧 */}
      <div className="flex-1 p-4">
        {posts.map((post) => (
          <div
            key={post.post_id}
            className="bg-pink-light p-[5px] mb-4 rounded-lg shadow-md w-[355px]"
          >
            <div className="bg-slate-100 w-[345px] rounded-lg">
              <div className="pl-4 pt-3 text-xs">{post.title}</div>
              <div className="pl-4 pt-3 pb-3">{post.content}</div>
            </div>
            <div className="flex items-center mt-2">
              <LikeButton
                size={35}
                defaultLiked={post.likes > 0} // 初期状態
                onClick={(liked) =>
                  handleLike(
                    post.post_id,
                    liked ? post.likes + 1 : post.likes - 1
                  )
                }
                likesCount={post.likes} // いいね数を渡す
              />

              <button
                onClick={() => handleOpenComments(post.post_id)}
                className="ml-4"
              >
                <FontAwesomeIcon icon={faComment} className="mr-2" />
                {getCommentCount(post.post_id)}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* コメントモーダル */}
      <CommentModal postId={selectedPostId} onClose={handleCloseComments} />

      {/* フッターボタン */}
      <Footer onOpenModal={() => setIsOpened(true)} />
    </div>
  );
};

export default PostPage;
