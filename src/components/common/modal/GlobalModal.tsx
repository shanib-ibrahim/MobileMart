import React, { type ReactNode } from "react";
import { X } from "lucide-react";
import styles from "./GlobalModal.module.scss";

interface GlobalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const GlobalModal: React.FC<GlobalModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default GlobalModal;
