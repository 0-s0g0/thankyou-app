import { createClient } from "@/app/utils/supabase/client";
import { useUser } from "@/app/contexts/UserContext";

type Group = {
  id: string;
  make_user: string;
  group_name: string;
  members: Member[];
  description: Color;
};

type Member = {
  id: string;
  name: string;
};

type Color = {
  color1: string;
  color2: string;
};

interface Props {
  groupName: string;
  setGroupName: (groupName: string) => void;
  color1: string;
  color2: string;
  setColor1: (color1: string) => void;
  setColor2: (color2: string) => void;
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  isOpened: boolean;
  setIsOpened: (isOped: boolean) => void;
}

export const MakeGroup: React.FC<Props> = ({
  groupName,
  setGroupName,
  color1,
  color2,
  setColor1,
  setColor2,
  setGroups,
  isOpened,
  setIsOpened,
}) => {
  const supabase = createClient();
  const { user } = useUser();

  async function insertGroupData() {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    const { data, error } = await supabase.from("groups").insert([
      {
        make_user: user.id,
        group_name: groupName,
        members: [{ member_id: user.id, name: user.user_metadata.name }],
        description: { color1: color1, color2: color2 },
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Inserted data:", data);
      const fetchGroups = async () => {
        const { data, error } = await supabase.from("groups").select("*");
        if (error) {
          console.error("Error fetching groups:", error);
        } else {
          setGroups(data || []);
        }
      };
      fetchGroups();
      setIsOpened(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mt-6 font-bold">グループの作成</h1>

      <div className="mt-4">
        <h1 className="text-center text-sm my-2 font-bold">グループ名</h1>
        <input
          onChange={(e) => setGroupName(e.target.value)}
          type="text"
          value={groupName}
          placeholder="グループ名を入力してください"
          className="w-[68vw] p-1 shadow-inner rounded-md bg-gray-100 text-center"
        />
      </div>

      <div className="flex flex-col justify-center items-center mt-10">
        <div
          className="w-24 h-24 rounded-full"
          style={{
            background: `linear-gradient(45deg, ${color1}, ${color2})`,
          }}
        ></div>
        <div className="flex gap-4 mt-4">
          <div className="flex flex-col items-center">
            <label
              htmlFor="colorPicker1"
              className="p-1 border-[1px] border-gray-400 rounded-md text-[10px] cursor-pointer"
            >
              カラー①
            </label>
            <input
              id="colorPicker1"
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="hidden"
            />
          </div>
          <div className="flex flex-col items-center">
            <label
              htmlFor="colorPicker2"
              className="p-1 border-[1px] border-gray-400 rounded-md text-[10px] cursor-pointer"
            >
              カラー②
            </label>
            <input
              id="colorPicker2"
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="hidden"
            />
          </div>
        </div>
      </div>

      <button
        onClick={insertGroupData}
        className="mt-20 py-1 px-8 rounded-md text-lg font-bold text-white bg-pink-dark"
      >
        作成
      </button>
    </div>
  );
};
