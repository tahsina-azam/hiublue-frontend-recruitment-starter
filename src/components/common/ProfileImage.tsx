import Image from "next/image";

interface ProfileImageProps {
  src: string;
  size?: number;
}

export default function ProfileImage({ src, size = 40 }: ProfileImageProps) {
  return (
    <Image
      src={src}
      alt="User Profile"
      width={size}
      height={size}
      style={{ borderRadius: "50%" }}
    />
  );
}
