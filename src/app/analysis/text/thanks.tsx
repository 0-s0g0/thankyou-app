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

  return (
    <div>
      <h1>感謝のメッセージを生成</h1>
      <div>
        <label htmlFor="userInput">感謝のメッセージを送りたい内容を入力してください：</label>
        <input
          type="text"
          id="userInput"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="例: 誕生日のお祝い、お菓子を作ってくれた"
        />
      </div>
      <button onClick={handleGenerateMessage} disabled={loading}>
        {loading ? '生成中...' : '生成する'}
      </button>

      {thankYouMessage && (
        <div>
          <h2>生成された感謝のメッセージ:</h2>
          <p>{thankYouMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ThankYouPage;
