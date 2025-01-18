export type Post = {
    userid: string;   // ユーザーID (UUID型)
    group: number;    // 投稿するグループ番号
    post_id: number;  // ポストID (SERIAL型)
    title: string;    // 投稿タイトル
    content: string;  // 投稿内容
    likes: number;    // いいね数
    created_at: string; // 作成日時
};

export type Comment = {
    comment_id: number; // コメントID (SERIAL型)
    post_id: number;    // 紐づくポストID (ポストID)
    userid: string;     // ユーザーID (UUID型)
    text: string;       // コメント内容
    likes: number;      // コメントへのいいね数
    created_at: string; // 作成日時
};

export type CelebrateMessage = {
    message_id: number;       // メッセージのID (自動生成されるSERIAL)
    foruser_id: number;       // メッセージを送るユーザのID
    touser_id: number;        // メッセージを受け取るユーザのID
    hp_bday: string;          // 送られるユーザの誕生日
    title: string;            // メッセージのタイトル
    content: string;          // メッセージの内容
    bgcolor: string;          // 背景画像のファイル名
  };
  