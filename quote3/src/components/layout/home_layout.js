// purpose: avoid re-mounting Home page
// this layout keeps Home page invisible instead of unmouting during usage

"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Home from "@/app/pages/home/home";

export default function HomeLayout({ children }) {
  const myId = useSelector((state) => state.myProfile.id);

  const [homeScrollPosition, set_HSP] = useState(0);
  const [isRestored, setIsRestored] = useState(false); // Flag to track if the scroll has been restored

  const path = usePathname();
  const isHomePage = path === "/";

  // Save the scroll position
  const saveScroll = () => {
    if (isRestored) {
      set_HSP(window.scrollY); // Save scroll position
    }
  };

  // UseEffect to handle app navigating
  useEffect(() => {
    if (isHomePage) {
      window.scrollTo(0, homeScrollPosition);
      setIsRestored(true); // Set restore flag to true once restoration is done
    } else {
      setIsRestored(false);
    }
  }, [path]);

  // Detect user interaction with mouse, keyboard, or touch screen
  useEffect(() => {
    // Add event listeners for detecting user interaction
    window.addEventListener("mousedown", saveScroll);
    window.addEventListener("keydown", saveScroll);
    window.addEventListener("touchstart", saveScroll);

    // Cleanup
    return () => {
      window.removeEventListener("mousedown", saveScroll);
      window.removeEventListener("keydown", saveScroll);
      window.removeEventListener("touchstart", saveScroll);
    };
  }, [isRestored]);

  return (
    <div>
      <div
        style={{
          display: isHomePage ? "block" : "none",
          visibility: isRestored ? "visible" : "hidden",
        }}
      >
        <Home key={myId} />
      </div>
      <div>{children}</div>
    </div>
  );
}
