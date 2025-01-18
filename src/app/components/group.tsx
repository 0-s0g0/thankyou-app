"use client";
import { useEffect, useState } from "react";
import { GroupModal } from "./group-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type group = {
  id: number;
  members: member[];
  description: string;
};

type member = {
  id: number;
  nickname: string;
};

const groupArray: group[] = [
  {
    id: 1,
    members: [
      {
        id: 1,
        nickname: "taro",
      },
    ],
    description: "Group 1",
  },
  {
    id: 2,
    members: [
      {
        id: 2,
        nickname: "hanako",
      },
      {
        id: 3,
        nickname: "jiro",
      },
    ],
    description: "Group 2",
  },
  {
    id: 3,
    members: [
      {
        id: 4,
        nickname: "sakura",
      },
    ],
    description: "Group 3",
  },
  {
    id: 4,
    members: [
      {
        id: 5,
        nickname: "takeshi",
      },
      {
        id: 6,
        nickname: "naomi",
      },
    ],
    description: "Group 4",
  },
  {
    id: 5,
    members: [
      {
        id: 7,
        nickname: "ryo",
      },
    ],
    description: "Group 5",
  },
  {
    id: 6,
    members: [
      {
        id: 8,
        nickname: "miho",
      },
      {
        id: 9,
        nickname: "kenta",
      },
    ],
    description: "Group 6",
  },
  {
    id: 7,
    members: [
      {
        id: 10,
        nickname: "ayaka",
      },
    ],
    description: "Group 7",
  },
  {
    id: 8,
    members: [
      {
        id: 11,
        nickname: "shota",
      },
    ],
    description: "Group 8",
  },
  {
    id: 9,
    members: [
      {
        id: 12,
        nickname: "yuki",
      },
      {
        id: 13,
        nickname: "mei",
      },
    ],
    description: "Group 9",
  },
];
const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

const Group = () => {
  const [selectGroup, setSelectGroup] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const [color1, setColor1] = useState("#ffffff");
  const [color2, setColor2] = useState("#000000");

  useEffect(() => {
    if (isOpened) {
      setColor1(getRandomColor());
      setColor2(getRandomColor());
    }
  }, [isOpened]);

  return (
    <div className="w-full px-4 pt-4 pb-2 overflow-x-auto">
      <GroupModal isOpened={isOpened} setIsOpened={setIsOpened}>
        <div className="flex flex-col justify-center items-center">
          <h1 className="mt-6 font-bold">グループの作成</h1>

          <div className="mt-4">
            <h1 className="text-center text-sm my-2 font-bold">グループ名</h1>
            <input
              type="text"
              placeholder="グループ名を入力してください"
              className="w-[300px] p-1 shadow-inner rounded-md bg-gray-100 text-center"
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

          <button className="mt-20 py-1 px-8 rounded-md text-lg font-bold text-white bg-pink-dark">
            作成
          </button>
        </div>
      </GroupModal>

      <div className="flex items-center gap-4 w-max">
        <div
          onClick={() => setIsOpened(true)}
          className="w-10 h-10 rounded-full bg-light-yellow flex justify-center items-center"
        >
          <FontAwesomeIcon
            className="text-orange w-6 h-6 rounded-full"
            icon={faPlus}
          />
        </div>
        {groupArray.map((group) => (
          <div
            key={group.id}
            className={`w-12 h-12 rounded-full bg-gray-300 flex justify-center items-center duration-100 ${
              selectGroup == group.id && "border-2 border-pink-dark"
            }`}
            onClick={() => setSelectGroup(group.id)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Group;
