"use client";
import { useState, useEffect } from "react";
//components
import { CelebrateMessage } from "../components/types";
import HPBModal from "./cpmponents/HPBModal";
import MessageModal from "./cpmponents/messageModal";
import { createClient } from "../utils/supabase/client";
import Styles from "./cpmponents/sentModal.module.css";
//icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const PostPage = () => {
  const [issentOpened, setIssentOpened] = useState(false);
  const [ishpbOpened, setIshpbOpened] = useState(false);
  const [messages, setMessages] = useState<CelebrateMessage[]>([]);
  const [selectedMessage, setSelectedMessage] =
    useState<CelebrateMessage | null>(null);
  const [isMessagesVisible, setIsMessagesVisible] = useState(false); // メッセージ一覧の表示制御

  const supabase = createClient();

  // データをSupabaseから取得する関数
  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("celebratemessage") // Supabaseのテーブル名を指定
        .select("*"); // 必要なカラムを指定（ここでは全てのカラム）

      if (error) {
        throw error;
      }

      setMessages(data as CelebrateMessage[]); // 取得したデータをステートにセット
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages(); // コンポーネントがマウントされた時にデータを取得
  }, []);

  const handleTitleClick = (message: CelebrateMessage) => {
    setSelectedMessage(message);
    setIssentOpened(true); // モーダルを開く
  };

  const closeHPBmodal = () => {
    setIshpbOpened(false); // モーダルを閉じる
    // モーダルが閉じられた後に、メッセージ一覧を表示する
    setTimeout(() => {
      setIsMessagesVisible(true); // メッセージリストを表示
    }, 300); // アニメーションの後に表示
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* 投稿モーダル */}
      <HPBModal isOpened={ishpbOpened} onClose={closeHPBmodal} />

      {!ishpbOpened && (
        <div
          className={`mt-12 ${isMessagesVisible ? "z-10" : "z-50"}`}
          onClick={() => setIshpbOpened(true)}
        >
          <button>
            <FontAwesomeIcon
              icon={faEnvelopeOpenText}
              className="w-12 h-12 text-blue-300 bg-white p-4 rounded-full"
            />
          </button>
        </div>
      )}
      <div className="mt-8 w-full flex flex-col items-center">
        {/* メッセージリストの表示 */}

        {!isMessagesVisible ? (
          <MessageModal
            isOpened={issentOpened}
            onClose={() => setIssentOpened(false)}
            message={selectedMessage} // 詳細情報をモーダルに渡す
          />
        ) : (
          <>
            <h2 className={Styles.title2}>メッセージ一覧</h2>
            <ul className="transition-transform transform translate-y-10 duration-500 ease-out">
              {messages.map((message) => (
                <li
                  key={message.message_id}
                  className="w-[350px]  bg-blue-100 p-4 mb-2 rounded shadow animate-fade-in-top"
                >
                  <button
                    onClick={() => handleTitleClick(message)}
                    className=" flex flex-row items-center gap-4 w-full"
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="w-12 h-12 text-blue-300 bg-white p-4 rounded-full"
                    />
                    <div className="p-1">{message.title}</div>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default PostPage;
