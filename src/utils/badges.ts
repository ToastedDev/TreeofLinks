import type { IconType } from "react-icons";
import { FaCheck, FaCrown } from "react-icons/fa";
import colors from "tailwindcss/colors";

export type Badge = {
  name: string;
  title: string;
  color: string;
  icon: IconType;
};

export const badges: Badge[] = [
  {
    name: "owner",
    title: "Owner",
    color: colors.yellow[400],
    icon: FaCrown,
  },
  {
    name: "verified",
    title: "Verified",
    color: colors.green[500],
    icon: FaCheck,
  },
];
