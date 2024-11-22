"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Modal({
  children,
  modalOpen,
  setModalOpen = () => {},
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Close modal when the path changes
    setModalOpen(false);
  }, [pathname]); // Dependency on the current path

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [modalOpen]);

  if (modalOpen)
    return (
      <div
        className="overlay"
        onClick={() => {
          setModalOpen(false);
        }}
      >
        <div
          className="modal"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    );

  return null;
}
