import { useEffect } from "react";

export default function Modal({
  children,
  modalOpen,
  setModalOpen = () => {},
}) {
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
}
