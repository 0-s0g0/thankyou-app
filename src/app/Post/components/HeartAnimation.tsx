import React from "react";
import { Heart } from "lucide-react";
import { clsx } from "clsx";

type LikeButtonProps = {
  size?: number;
  text?: string;
  onClick?: (arg0: boolean) => void;
  defaultLiked?: boolean;
};

export const LikeButton = ({
  size = 50,
  defaultLiked = false,
  text,
  onClick,
}: LikeButtonProps) => {
  const width = Math.floor(size * 25);
  const [isLiked, setIsLiked] = React.useState(defaultLiked);
  const [clicked, setClicked] = React.useState(false);

  const handleOnClick = () => {
    if (onClick) onClick(!isLiked);
    setIsLiked(!isLiked);
    if (!clicked) setClicked(true);
  };

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer"
      style={{
        width: text ? "auto" : `${size}px`,
        height: `${size}px`,
        paddingLeft: text ? `${size}px` : "0",
      }}
      onClick={handleOnClick}
    >
      <div
        className={clsx(
          `like-base-64 absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-full`,
          isLiked ? "hover:bg-pink-50" : "hover:bg-gray-50",
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundSize: `auto ${size}px`,
          transition: `background-position steps(25)`,
          transitionDuration: isLiked ? "1s" : "0s",
          backgroundPosition: isLiked ? `-${width}px 0` : `0 0`,
        }}
      >
        <Heart
          className={clsx(
            isLiked
              ? "fill-pink-400 text-pink-400"
              : "fill-transparent text-gray-400",
            clicked ? (isLiked ? "like-animation" : "like-animation-end") : "",
          )}
          size={Math.floor(size / 2)}
          strokeWidth={1}
        />
      </div>
      {text && (
        <span
          className={clsx(
            "text-sm",
            isLiked ? "text-pink-400" : "text-gray-400",
          )}
        >
          {text}
        </span>
      )}
    </div>
  );
};
