import { Post, Comment } from "../components/types";

export const dummyPosts: Post[] = [
  { userid: 1, postid: 1, title: "投稿1title", content: "これは匿名の投稿1です。", likes: 3},
  { userid: 2, postid: 2, title: "投稿2title", content: "これは匿名の投稿2です。", likes: 5},
];

export const dummyComments: Comment[] = [
  { commentId: 1, postid: 1, text: "投稿1へのコメントです。1-1", userid: 1, likes: 2 },
  { commentId: 2, postid: 1, text: "投稿1へのコメント1-2", userid: 2, likes: 0 },
  { commentId: 3, postid: 2, text: "投稿2へのコメント2-1", userid: 1, likes: 1 },
  { commentId: 4, postid: 1, text: "投稿1へのコメントです。1-3", userid: 4, likes: 2 },

];
