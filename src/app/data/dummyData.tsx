import { Post, Comment } from "../components/types";

export const dummyPosts: Post[] = [
  { userid: 1,group:1, postid: 1, title: "投稿1title", content: "これは匿名の投稿1です。", likes: 3},
  { userid: 2, group:1,postid: 2, title: "投稿2title", content: "これは匿名の投稿2です。", likes: 5},
  { userid: 3, group:1,postid: 3, title: "投稿3title", content: "これは匿名の投稿3です。", likes: 5},
  { userid: 4, group:2,postid: 4, title: "投稿4title", content: "これは匿名の投稿4です。", likes: 4},
  { userid: 5, group:2,postid: 5, title: "投稿5title", content: "これは匿名の投稿5です。", likes: 2},
  { userid: 1, group:3,postid: 6, title: "投稿6title", content: "これは匿名の投稿6です。", likes: 3},
  { userid: 2, group:3,postid: 7, title: "投稿7title", content: "これは匿名の投稿7です。", likes: 1},
  { userid: 3, group:3,postid: 8, title: "投稿8title", content: "これは匿名の投稿8です。", likes: 6},
  { userid: 4, group:3,postid: 9, title: "投稿9title", content: "これは匿名の投稿9です。", likes: 5},
  { userid: 5, group:4,postid: 10, title: "投稿10title", content: "これは匿名の投稿10です。", likes: 8},

];

export const dummyComments: Comment[] = [
  { commentId: 1, postid: 1, text: "投稿1へのコメントです。1-1", userid: 1, likes: 2 },
  { commentId: 2, postid: 1, text: "投稿1へのコメント1-2", userid: 2, likes: 0 },
  { commentId: 3, postid: 2, text: "投稿2へのコメント2-1", userid: 1, likes: 1 },
  { commentId: 4, postid: 1, text: "投稿1へのコメントです。1-3", userid: 4, likes: 2 },

];
