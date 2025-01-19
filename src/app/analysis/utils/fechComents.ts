import { createClient } from '../../utils/supabase/client';

// Supabaseクライアントの作成
const supabase = createClient();

// コメントをSupabaseから取得
export const getPosts = async () => {
    const { data, error } = await supabase
      .from('posts') // 'posts'テーブルからデータを取得
      .select('content') // 'content'カラム（投稿内容）を取得
      .order('created_at', { ascending: false });
  
    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  
    return data;
  };