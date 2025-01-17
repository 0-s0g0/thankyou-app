// グループごとに投稿数をカウントする関数
export  const countPostsByGroup = (posts: { group: number }[]) => {
    return posts.reduce((acc, post) => {
      acc[post.group] = (acc[post.group] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
  };


// グループごとの総いいね数を計算する関数
export const countLikesByGroup = (posts: { group: number; likes: number }[]) => {
    return posts.reduce((acc, post) => {
      acc[post.group] = (acc[post.group] || 0) + post.likes;
      return acc;
    }, {} as Record<number, number>);
  };

// グループごとの投稿数と総いいね数をまとめる関数
export const getGroupStats = (posts: { group: number; likes: number }[]) => {
    const postsCount = countPostsByGroup(posts);
    const totalLikes = countLikesByGroup(posts);
  
    return Object.keys(postsCount).reduce((acc, groupId) => {
      const groupIdNumber = parseInt(groupId, 10);
      acc[groupIdNumber] = {
        postsCount: postsCount[groupIdNumber],
        totalLikes: totalLikes[groupIdNumber] || 0,
      };
      return acc;
    }, {} as Record<number, { postsCount: number; totalLikes: number }>);
  };


////////////////////////////////////////////////////////////////////////////////
// グループごとに投稿数をカウントする関数
export const getTotalPostsByGroup = (posts: { group: number }[], groupId: number): number => {
    return posts.filter((post) => post.group === groupId).length; // 指定されたグループの投稿数をカウント
  };

// グループごとの総いいね数を計算する関数
export const getTotalLikesByGroup = (posts: { group: number; likes: number }[], groupId: number): number => {
    return posts
      .filter((post) => post.group === groupId) // 指定されたグループの投稿だけを抽出
      .reduce((totalLikes, post) => totalLikes + post.likes, 0); // 総いいね数を計算
  };