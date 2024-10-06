// purpose: avoid re-mounting Home page
// this layout keeps Home page invisible instead of unmouting during usage

"use client";
import { usePathname } from "next/navigation";
import Home from "@/app/page";

export default function HomeLayout({ children }) {
  const path = usePathname();

  return (
    <div>
      <div style={{ display: path == "/" ? "block" : "none" }}>
        <Home />
      </div>
      {path != "/" && <div>{children}</div>}
    </div>
  );
}
