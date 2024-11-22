"use client";
import { useEffect } from "react";
import styles from "./absolute_modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserActions } from "../redux/action";

export function AbsoluteModal({ children, modalOpen, setModalOpen }) {
  const reduxCloseModal = useSelector((state) => state.userActions.closeModal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reduxCloseModal) {
      setModalOpen(false);
    }
  }, [reduxCloseModal]);

  useEffect(() => {
    if (modalOpen) {
      dispatch(updateUserActions({ closeModal: false }));
    }
  }, [modalOpen]);

  if (modalOpen)
    return (
      <div
        className={styles.modal}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    );
}

export function ModalController({ children }) {
  const dispatch = useDispatch();
  const reduxCloseModal = useSelector((state) => state.userActions.closeModal);

  return (
    <div
      onClick={() => {
        if (!reduxCloseModal) {
          dispatch(updateUserActions({ closeModal: true }));
        }
      }}
    >
      <div className={styles.base}></div>
      {children}
    </div>
  );
}
