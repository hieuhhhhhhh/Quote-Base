import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function preventRootScroll(activated) {
  const [scrollY, setScrollY] = useState(0);
  const [offSet, setOffSet] = useState(0);

  const path = usePathname();

  const handleScroll = () => {
    if (activated) {
      setOffSet(scrollY);
    } else {
      setScrollY(window.scrollY);
      setOffSet(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activated]);

  useEffect(() => {
    if (activated) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";

      document.body.style.overflowY = "scroll";
      document.body.style.top = `-${offSet}px`;
    } else if (!activated) {
      document.body.style.position = "static";
      window.scrollTo(0, offSet);
    }
  }, [activated]);

  useEffect(() => {
    return () => {
      document.body.style.position = "static";
      document.body.style.overflowY = "auto";
    };
  }, [path]);
}
