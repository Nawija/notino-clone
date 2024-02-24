import { HeightWightTypes } from "@/src/types";
import Image from "next/image";

export function ArrowLeft({ h, w }: HeightWightTypes) {
  return (
    <Image
      src="/arrowLeft.svg"
      alt="strzałka w bok"
      height={h || 12}
      width={w || 12}
    />
  );
}
export function ArrowRight({ h, w }: HeightWightTypes) {
  return (
    <Image
      src="/arrowRight.svg"
      alt="strzałka w bok"
      height={h || 12}
      width={w || 12}
    />
  );
}
