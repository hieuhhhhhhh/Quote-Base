// purpose: avoid re-mounting Home page
// this layout keeps Home page invisible instead of unmouting during usage

"use client";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Home from "@/app/pages/home/home";

export default function HomeLayout({ children }) {
  const path = usePathname();
  const myId = useSelector((state) => state.myProfile.id);

  return (
    <div>
      <div style={{ display: path == "/" ? "block" : "none" }}>
        <Home key={myId} />
      </div>
      <div>{children}</div>
    </div>
  );
}
