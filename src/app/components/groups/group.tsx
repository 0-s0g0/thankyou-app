"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { GroupModal } from "./group-modal";
import { GroupMenu } from "./group-menu";
import { MakeGroup } from "./make-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@/app/utils/supabase/client";
import Link from "next/link";

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

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

const Group = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectGroup, setSelectGroup] = useState<string | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [groupInfo, setGroupInfo] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [color1, setColor1] = useState("#ffffff");
  const [color2, setColor2] = useState("#000000");

  useEffect(() => {
    const fetchGroups = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("groups").select("*");
      if (error) {
        console.error("Error fetching groups:", error);
      } else {
        setGroups(data || []);
      }
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    if (isOpened) {
      setColor1(getRandomColor());
      setColor2(getRandomColor());
    }
  }, [isOpened]);

  const checkGroupInfo = (id: string) => {
    if (id === selectGroup) {
      setGroupInfo(true);
    } else {
      setSelectGroup(id);
      setGroupInfo(false);
      const params = new URLSearchParams(window.location.search);
      params.set("group", id);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/mypage") {
    return null;
  }

  return (
    <div className="w-full px-4 pt-4 pb-4 overflow-x-auto">
      <GroupModal isOpened={isOpened} setIsOpened={setIsOpened}>
        <MakeGroup
          groupName={groupName}
          setGroupName={setGroupName}
          color1={color1}
          color2={color2}
          setColor1={setColor1}
          setColor2={setColor2}
          groups={groups}
          setGroups={setGroups}
          isOpened={isOpened}
          setIsOpened={setIsOpened}
        />
      </GroupModal>

      <GroupMenu isOpened={groupInfo} setIsOpened={setGroupInfo}>
        <div className="py-16 h-full flex flex-col justify-center items-center gap-8">
          <Link
            onClick={() => setGroupInfo(false)}
            href={"/celebrate"}
            className="w-[60vw] h-24 bg-pink-light text-black shadow-md rounded-lg flex flex-col justify-center items-center"
          >
            <h1 className="text-lg font-bold">お祝いをしよう！</h1>
          </Link>
          <Link
            onClick={() => setGroupInfo(false)}
            href={"/celebrate/sent"}
            className="w-[60vw] h-24 bg-pink-light text-black shadow-md rounded-lg flex flex-col justify-center items-center"
          >
            <h1 className="text-lg font-bold">親愛なるあなたへ</h1>
          </Link>

          <Link
            onClick={() => setGroupInfo(false)}
            href={"/calendar"}
            className="w-[60vw] h-24 bg-pink-light text-black shadow-md rounded-lg flex flex-col justify-center items-center"
          >
            <h1 className="text-lg font-bold">誕生日カレンダー</h1>
          </Link>
        </div>
      </GroupMenu>

      <div className="flex items-center gap-4 w-max">
        <button
          onClick={() => setIsOpened(true)}
          className="w-10 h-10 rounded-full bg-light-yellow flex justify-center items-center"
          aria-label="Create Group"
        >
          <FontAwesomeIcon
            className="text-orange w-6 h-6 rounded-full"
            icon={faPlus}
          />
        </button>
        {groups.length === 0 ? (
          <p className="text-gray-500 text-xs">グループがありません</p>
        ) : (
          groups.map((group) => (
            <div
              key={group.id}
              className="flex flex-col justify-center items-center"
            >
              <div
                className={`w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center duration-100 ${
                  selectGroup === group.id
                    ? "border-2 border-white outline outline-2 outline-pink-dark"
                    : ""
                }`}
                style={{
                  background: `linear-gradient(45deg, ${group.description.color1}, ${group.description.color2})`,
                }}
                onClick={() => checkGroupInfo(group.id)}
              ></div>
              <p
                className={`text-[10px] mt-1 ${
                  selectGroup === group.id ? "font-bold" : ""
                }`}
              >
                {group.group_name}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Group;
