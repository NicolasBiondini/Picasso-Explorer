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
    />
  );
}

export default Logo;
