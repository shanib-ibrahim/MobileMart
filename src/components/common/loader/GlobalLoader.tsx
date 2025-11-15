import React from "react";
import styles from "./loader.module.scss";

interface LoaderProps {
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ size = 40 }) => {
  return (
    <div className={styles.loaderWrapper}>
      <div
        className={styles.loader}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default Loader;
