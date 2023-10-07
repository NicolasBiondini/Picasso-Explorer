import Image from "next/image";

type Props = {};

function Logo({}: Props) {
  return (
    <Image
      src={
        "https://res.cloudinary.com/blogfilmania/image/upload/v1696444033/Group_15_ldryfv.svg"
      }
      width={194}
      height={80}
      alt="piccasso explorer logo"
      priority
      className="w-[98px] h-[40px] md:w-[194px] md:h-[80px]"
    />
  );
}

export default Logo;
