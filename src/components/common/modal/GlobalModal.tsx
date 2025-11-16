import React, { type ReactNode } from "react";
import { X } from "lucide-react";
import styles from "./modal.module.scss";

interface GlobalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const GlobalModal: React.FC<GlobalModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  // Clicking on backdrop will close modal
  const handleBackdropClick = () => {
    onClose();
  };

  // Prevent clicks inside modal from closing
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} onClick={handleModalClick}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        {title && (
          <div className={styles.header}>
            <h3>{title}</h3>
          </div>
        )}

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default GlobalModal;
