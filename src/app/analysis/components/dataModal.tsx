import React, { useEffect, useState } from 'react';
import { Modalcanvas } from '../../components/modalcanvas';
import styles from '../css/analysis.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHeart, faComments } from "@fortawesome/free-solid-svg-icons";
import { createClient } from '../../utils/supabase/client';

export type Post = {
  userid: string;
  group: number;
  post_id: number;
  title: string;
  content: string;
  likes: number;
  created_at: string;
};

export type Comment = {
  comment_id: number;
  post_id: number;
  userid: string;
  content: string;
  created_at: string;
};

type DataModalProps = {
  isOpened: boolean;
  onClose: () => void;
  groupName: string;
  groupId: string;
};

const DataModal: React.FC<DataModalProps> = ({ isOpened, onClose, groupName, groupId }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLikes: 0,
    totalPosts: 0,
    totalComments: 0,
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // 投稿データの取得
        const { data: posts, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .eq('group_id', groupId);

        if (postsError) throw postsError;

        // コメントデータの取得
        const { data: comments, error: commentsError } = await supabase
          .from('comments')
          .select('*');

        if (commentsError) throw commentsError;

        if (posts) {
          // 投稿統計を計算
          const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);
          const totalPosts = posts.length;
          const uniqueUsers = new Set(posts.map((post) => post.userid));
          const totalUsers = uniqueUsers.size;

          // コメント統計を計算
          const totalComments = comments
            ? comments.filter((comment) => posts.some((post) => post.post_id === comment.post_id)).length
            : 0;

          setStats({
            totalUsers,
            totalLikes,
            totalPosts,
            totalComments,
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpened) {
      fetchStats();
    }
  }, [isOpened, groupId]);

  return (
    <Modalcanvas isOpened={isOpened} setIsOpened={onClose}>
      <div className="mt-16 flex flex-col items-center animate-fade-in-right">
        <div className={styles.box19}>{groupName}</div>
        <div className="mt-8 h-[120px] flex flex-row gap-2">
          <div className="flex flex-col bg-white items-center rounded-lg h-[160px] w-[110px] p-3">
            <FontAwesomeIcon icon={faUsers} className="w-12 h-12 text-blue-300" />
            <h3 className="text-3xl p-3 font-bold text-blue-600">
              {loading ? '...' : stats.totalUsers}
            </h3>
            <h3 className="text-sm">総ユーザー数</h3>
          </div>

          <div className="flex flex-col bg-white items-center rounded-lg h-[160px] w-[110px] p-3">
            <FontAwesomeIcon icon={faHeart} className="w-12 h-12 text-pink-300" />
            <h3 className="text-3xl p-3 font-bold text-pink-600">
              {loading ? '...' : stats.totalLikes}
            </h3>
            <h3 className="text-sm">総いいね数</h3>
          </div>

          <div className="flex flex-col bg-white items-center rounded-lg h-[160px] w-[110px] p-3">
            <FontAwesomeIcon icon={faComments} className="w-12 h-12 text-green-300" />
            <h3 className="text-3xl p-3 font-bold text-green-600">
              {loading ? '...' : stats.totalPosts}
            </h3>
            <h3 className="text-sm">総投稿数</h3>
          </div>
        </div>
      </div>
    </Modalcanvas>
  );
};

export default DataModal;
