import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function preventBodyScroll(active) {
  const [scrollY, setScrollY] = useState(0);
  const [offSet, setOffSet] = useState(0);

  const path = usePathname();

  const handleScroll = () => {
    if (!active) {
      setScrollY(window.scrollY);
    } else {
      setOffSet(scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [active]);

  useEffect(() => {
    if (active) {
      document.body.style.position = "fixed";
      document.body.style.overflowY = "scroll";
      document.body.style.top = `-${scrollY}px`;
    } else if (!active) {
      document.body.style.position = "static";

      window.scrollTo(0, offSet);
    }
  }, [active]);

  useEffect(() => {
    return () => {
      document.body.style.position = "static";
      document.body.style.overflowY = "auto";
    };
  }, [path]);
}
