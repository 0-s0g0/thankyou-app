"use client";
import { useState } from "react";
import SentModal from "../cpmponents/sentModal";

//icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const PostPage = () => {
  const [issentOpened, setIssentOpened] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* 投稿モーダル */}
      <SentModal
        isOpened={issentOpened}
        onClose={() => setIssentOpened(false)}
      />

      <div
        className={`mt-6 flex flex-row delay-300 duration-300 ${
          issentOpened ? "z-[-10]" : "z-30"
        }`}
      >
        <button onClick={() => setIssentOpened(true)} className="">
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="w-12 h-12 text-blue-300 bg-white p-4 rounded-full"
          />
        </button>
      </div>
    </div>
  );
};

export default PostPage;
