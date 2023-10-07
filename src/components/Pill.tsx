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
      className={`w-full md:w-[200px] lg:w-[400px] md:max-w-[200px] lg:max-w-none flex flex-col items-center h-28 justify-center ${
        color ? color : "bg-blacklight"
      }  rounded-lg`}
    >
      <p className="font-crimson text-xl font-semibold">{title}</p>
      {link ? (
        <a
          target="_blank"
          href={`/${link}`}
          className={`font-crimson text-md w-[150px] lg:w-[200px] truncate text-center ${
            linkColor ? linkColor : "hover:text-lowviolet"
          } `}
        >
          {info}
        </a>
      ) : (
        <span className="font-crimson text-md w-[150px] lg:w-[200px] truncate text-center">
          {info}
        </span>
      )}
    </div>
  );
}

export default Pill;
