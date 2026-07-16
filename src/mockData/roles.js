import {
  GraduationCap,
  CookingPot,
  BarChart3,
} from "lucide-react";

export const roles = [
  {
    id: "student",
    title: "Student",
    description:
      "View today's menu and submit meal feedback.",
    icon: GraduationCap,
  },
  {
    id: "mess-admin",
    title: "Mess Admin",
    description:
      "Manage daily menus and record food wastage.",
    icon: CookingPot,
  },
  {
    id: "higher-admin",
    title: "Higher Admin",
    description:
      "Monitor analytics and generate reports.",
    icon: BarChart3,
  },
];