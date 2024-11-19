import { useState } from "react";
import preventRootScroll from "./helpers/prevent_root_scroll";

export default function RootScrollBlockArea({ children }) {
  const [PRS_active, set_PRS_active] = useState(false); // PRS = prevent body scroll
  preventRootScroll(PRS_active);

  return (
    <div
      onMouseEnter={() => {
        set_PRS_active(true);
      }}
      onMouseLeave={() => {
        set_PRS_active(false);
      }}
    >
      {children}
    </div>
  );
}
