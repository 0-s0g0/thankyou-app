import { Post, Comment } from "../components/types";

export const dummyPosts: Post[] = [
  { userid: 1, group: 1, postid: 1, title: "お母さん、いつもありがとう！", content: "今日もご飯を作ってくれてありがとう！おかげで元気が出たよ！", likes: 3},
  { userid: 2, group: 1, postid: 2, title: "一緒に過ごせて幸せ", content: "お昼に一緒に食べたランチが本当においしかった！ありがとう！", likes: 5},
  { userid: 3, group: 1, postid: 3, title: "素敵なプレゼント", content: "思いがけないプレゼントをもらって、とても嬉しかった！心から感謝してるよ！", likes: 5},
  { userid: 4, group: 1, postid: 11, title: "あなたのおかげで笑顔に", content: "いつも明るくしてくれてありがとう！最近元気が出なかったけど、あなたのおかげで笑顔になれたよ！", likes: 5},
  { userid: 4, group: 2, postid: 4, title: "あなたの手紙が届いた", content: "心温まる手紙をありがとう！読んでいる間、涙が止まらなかったよ。大切に保管するね！", likes: 4},
  { userid: 5, group: 2, postid: 5, title: "ありがとう、いつも支えてくれて", content: "忙しい中でも、いつも私を支えてくれてありがとう！あなたの優しさに感謝してます。", likes: 2},
  { userid: 1, group: 3, postid: 6, title: "友達との再会", content: "久しぶりに会えた友達に感謝！楽しい時間をありがとう！これからもずっと大切な友達だよ！", likes: 3},
  { userid: 2, group: 3, postid: 7, title: "素晴らしいサプライズ", content: "サプライズでのプレゼント、ありがとう！心から嬉しかったし、すごく感動した！", likes: 1},
  { userid: 3, group: 3, postid: 8, title: "ありがとう、どんな時も", content: "いつも私を気にかけてくれてありがとう。あなたの優しさに救われているよ。", likes: 6},
  { userid: 4, group: 3, postid: 9, title: "ありがとう、あなたの笑顔", content: "あなたの笑顔を見ているだけで元気が出るよ。いつも素敵なエネルギーをありがとう！", likes: 5},
  { userid: 5, group: 4, postid: 10, title: "感謝の気持ちを込めて", content: "あなたの助けがあったからこそ、今日も頑張れた！ありがとう、感謝の気持ちでいっぱい！", likes: 8},
  { userid: 1, group: 1, postid: 12, title: "ふとした優しさに感謝", content: "昨日、道で困っていた私に手を差し伸べてくれてありがとう！知らない人の優しさに本当に感動しました。", likes: 4},
  { userid: 2, group: 2, postid: 13, title: "素敵な一日", content: "今日は天気が良くて、公園でのんびり過ごせて嬉しかった！自然の中でリフレッシュできたよ。", likes: 7},
  { userid: 3, group: 3, postid: 14, title: "感謝の気持ちを伝えたい", content: "いつも一緒にいてくれてありがとう。あなたがいるから毎日がもっと楽しいし、心強い！", likes: 6},
  { userid: 4, group: 4, postid: 15, title: "手作りのお菓子に感謝", content: "手作りのお菓子をもらって、すごく嬉しかった！愛情がこもった味が最高だったよ。ありがとう！", likes: 4},
  { userid: 5, group: 4, postid: 16, title: "支え合う友達に感謝", content: "最近、友達からたくさんの励ましをもらって元気を取り戻しました。ありがとう、あなたたちがいるから頑張れる！", likes: 5},
  { userid: 1, group: 2, postid: 17, title: "家族の支え", content: "家族が何気なくサポートしてくれて、本当に助かってます。ありがとう、いつも頼りにしてるよ！", likes: 3},
  { userid: 2, group: 3, postid: 18, title: "お世話になりました", content: "先週、困ったときに助けてくれた人々に感謝！あなたのおかげで乗り越えられました。", likes: 4},
  { userid: 3, group: 1, postid: 19, title: "心温まる言葉", content: "昨日、友達からかけてもらった言葉が心に響いた。ありがとう、その言葉で元気が出たよ。", likes: 2},
];
export const dummyComments: Comment[] = [
  { commentId: 1, postid: 1, text: "投稿1へのコメントです。1-1", userid: 1, likes: 2 },
  { commentId: 2, postid: 1, text: "投稿1へのコメント1-2", userid: 2, likes: 0 },
  { commentId: 3, postid: 2, text: "投稿2へのコメント2-1", userid: 1, likes: 1 },
  { commentId: 4, postid: 1, text: "投稿1へのコメントです。1-3", userid: 4, likes: 2 },

];

