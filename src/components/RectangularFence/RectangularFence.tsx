import React from "react";
import styles from "../../styles/fence.module.scss";
export default function RectangularFence({ children }: any) {
  return <div className={styles.Fence}>{children}</div>;
}
