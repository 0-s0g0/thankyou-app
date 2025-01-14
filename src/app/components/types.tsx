export type Post = { 
    userid: number;   // ユーザーID
    postid: number;   // ポストID
    title: string;    // 投稿タイトル
    content: string;  // 投稿内容
    likes: number;    // いいね数
};
  
export type Comment = {
    commentId: number; // コメントID
    postid: number;    // 紐づくポストID
    text: string;      // コメント内容
    userid: number;    // ユーザーID
    likes: number;     // コメントへのいいね数
};
  