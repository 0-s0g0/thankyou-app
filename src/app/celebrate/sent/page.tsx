"use client";
import { useState } from "react";
//components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Post, Comment } from "../../components/types";
import HPBModal from "../cpmponents/HPBModal";
import SentModal from "../cpmponents/sentModal";
//data
import { dummyPosts, dummyComments } from "../../data/dummyData";

//icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane} from "@fortawesome/free-solid-svg-icons";


const PostPage = () => {
  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const [newPostTitle, setNewPostTitle] = useState(""); // 新しい投稿のタイトルを管理
  const [newPostContent, setNewPostContent] = useState(""); // 新しい投稿の内容を管理
  const [isOpened, setIsOpened] = useState(false);
  const [isHPBModalOpened, setIHPBModalOpened] = useState(false);
  const [issentOpened, setIssentOpened] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null); // コメント表示用の投稿ID


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/*ヘッダー */}
      <Header />
      {/* 投稿モーダル */}
      <SentModal
        isOpened={issentOpened}
        onClose={() => setIssentOpened(false)}
      />

      <div className="mt-6 flex flex-row  gap-20">
        <button onClick={() => setIssentOpened(true)} className="ml-4">
                <FontAwesomeIcon icon={faPaperPlane}  className="w-12 h-12 text-blue-300 bg-white p-4 rounded-full"/>
        </button>

      </div>

      {/* 投稿一覧 
      <div className="flex-1 p-4">
        {posts.map((post) => (
          <div
            key={post.postid}
            className="bg-pink-light p-2 mb-4 rounded-lg shadow-md w-[380px]"
          >
            <div className="m-2 bg-slate-100">
              <div className="pl-4 pt-3 text-xs">{post.title}</div>
              <div className="pl-4 pt-3 pb-3">{post.content}</div>
            </div>
            <div className="flex items-center mt-2">
              <button onClick={() => handleLike(post.postid)} className="ml-4">
                <FontAwesomeIcon icon={faHeart} className="mr-2" />
                {post.likes}
              </button>
              <button
                onClick={() => handleOpenComments(post.postid)} // コメントを開く
                className="ml-4"
              >
                <FontAwesomeIcon icon={faComment} className="mr-2" />{" "}
                {getCommentCount(post.postid)}
              </button>
            </div>
          </div>
        ))}
      </div>*/}

      {/* フッターボタン */}
      <Footer onOpenModal={() => setIssentOpened(true)} />
    </div>
  );
};

export default PostPage;
