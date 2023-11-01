import React, { useState } from "react";
import styles from "./TagInput.module.scss";
function Tag({ tagInfo, tagIndex }) {
  const [editValue, setEditValue] = useState("[x]");
  const focusEdit = () => {
    setEditValue(editValue.slice(0, -1).slice(1));
  };
  const blurEdit = () => {
    setEditValue("[" + editValue + "]");
  };

  return (
    <span className={styles.tag} contentEditable={false} id={tagIndex}>
      <span>{tagInfo.name}</span>
      <span className={styles.verticalDivider}> | </span>
      <input
        className={styles.editInput}
        contentEditable
        onFocus={focusEdit}
        onBlur={blurEdit}
        value={editValue}
        onInput={(e) => setEditValue(e.target.value)}
      />
    </span>
  );
}
export default Tag;
