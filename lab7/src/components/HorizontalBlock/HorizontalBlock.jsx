import React from 'react';
import styles from './HorizontalBlock.module.css';

const HorizontalBlock = ({ title, content, buttonText, onClick, editMode, onTitleChange, onContentChange }) => {
  return (
    <section className={styles.horizontalBlock}>
      <h2 
        className={`${styles.editable} ${editMode ? styles.editMode : ''}`}
        contentEditable={editMode}
        onBlur={(e) => onTitleChange && onTitleChange(e.target.textContent)}
        suppressContentEditableWarning={true}
      >
        {title}
      </h2>
      <p 
        className={`${styles.editable} ${editMode ? styles.editMode : ''}`}
        contentEditable={editMode}
        onBlur={(e) => onContentChange && onContentChange(e.target.textContent)}
        suppressContentEditableWarning={true}
      >
        {content}
      </p>
      {buttonText && <button onClick={onClick}>{buttonText}</button>}
    </section>
  );
};

export default HorizontalBlock;