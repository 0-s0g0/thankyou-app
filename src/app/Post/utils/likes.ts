// utils/likeUtils.ts
import { createClient } from "../../utils/supabase/client"; // Supabaseクライアント


const supabase = createClient();

// いいねトグル
export const handleLikeToggle = async (userId: string | null, postId: number, currentLikes: number) => {
  if (!userId) return; // ユーザーがログインしていない場合は処理しない

  // すでにいいねを押しているか確認
  const { data, error } = await supabase
    .from("likes")
    .select("post_id")
    .eq("user_id", userId)
    .eq("post_id", postId)
    .single();

  if (data) {
    // すでにいいねを押している場合、いいねを取り消す
    const { error: deleteError } = await supabase
      .from("likes")
      .delete()
      .eq("user_id", userId)
      .eq("post_id", postId);

    if (deleteError) {
      console.error("Error removing like:", deleteError.message);
      return;
    }

    return currentLikes - 1; // いいねを減らす
  } else {
    // いいねを押す
    const { error: insertError } = await supabase.from("likes").insert({
      user_id: userId,
      post_id: postId,
    });

    if (insertError) {
      console.error("Error adding like:", insertError.message);
      return;
    }

    return currentLikes + 1; // いいねを増やす
  }
};
