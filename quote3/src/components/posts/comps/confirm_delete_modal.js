import React from "react";
import styles from "./delete_modal.module.css";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
