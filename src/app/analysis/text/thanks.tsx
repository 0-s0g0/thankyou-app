import React, { useState } from 'react';
import { generateThankYouMessage } from '../utils/generatedThanks';

const ThankYouPage = () => {
  const [userInput, setUserInput] = useState('');
  const [thankYouMessage, setThankYouMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // フォーム送信時に感謝のメッセージを生成
  const handleGenerateMessage = async () => {
    setLoading(true);
    const result = await generateThankYouMessage(userInput);
    setThankYouMessage(result.thankYouMessage);
    setLoading(false);
  };

  // メッセージをクリップボードにコピー
  const handleCopyMessage = () => {
    if (thankYouMessage) {
      navigator.clipboard.writeText(thankYouMessage)
        .then(() => {
          alert('メッセージがコピーされました!');
        })
        .catch((err) => {
          alert('コピーに失敗しました: ' + err);
        });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className='mt-5'>感謝のメッセージを生成</div>
      <div>
        <div className='mt-4 text-center'>
          <label htmlFor="userInput">キーワードを入力</label>
        </div>
        <input
          type="text"
          id="userInput"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="例: 誕生日"
          className='bg-white m-4 w-[200px]'
        />
      </div>
      <button onClick={handleGenerateMessage} disabled={loading} className='bg-blue-300 p-2 text-white rounded-lg'>
        {loading ? '生成中...' : '生成する'}
      </button>

      {thankYouMessage && (
        <div className='flex flex-col items-center'>
          <div className='m-3 bg-white'>{thankYouMessage}</div>

          {/* コピーボタンを追加 */}
          <button 
            onClick={handleCopyMessage} 
            className="bg-pink-300 p-2 mt-4 rounded-lg text-white"
          >
            メッセージをコピー
          </button>
        </div>
      )}
    </div>
  );
};

export default ThankYouPage;
