import React from "react";
import styles from "./Modal.module.sass";

export interface ModalProps {
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div
      className={styles.modal}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div className={styles.modal__inner} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
