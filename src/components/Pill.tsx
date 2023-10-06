import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  info: string;
  color?: string;
  link?: string;
  linkColor?: string;
};

function Pill({ title, info, color, link, linkColor }: Props) {
  return (
    <div
      className={`w-[200px] lg:w-1/4 max-w-[220px] flex flex-col items-center h-28 justify-center ${
        color ? color : "bg-blacklight"
      }  rounded-lg`}
    >
      <p className="font-crimson text-xl font-semibold">{title}</p>
      {link ? (
        <Link
          href={`/${link}`}
          className={`font-crimson text-md w-[150px] lg:w-[200px] truncate text-center ${
            linkColor ? linkColor : "hover:text-lowviolet"
          } `}
        >
          {info}
        </Link>
      ) : (
        <span className="font-crimson text-md w-[150px] lg:w-[200px] truncate text-center">
          {info}
        </span>
      )}
    </div>
  );
}

export default Pill;
