import React from 'react';
import styles from './VerticalBlock.module.css';

const VerticalBlock = ({ image, introText, editMode, onTextChange }) => {
  return (
    <div className={styles.verticalBlock}>
      <img src={image} alt="Profile Image" />
      <section className={styles.intro}>
        <h2>Краткая информация</h2>
        <p 
          className={`${styles.editable} ${editMode ? styles.editMode : ''}`}
          contentEditable={editMode}
          onBlur={(e) => onTextChange('introText', e.target.textContent)}
          suppressContentEditableWarning={true}
        >
          {introText}
        </p>
        <button onClick={() => alert("Оскар так и не взял")}>Пасхалка</button>
      </section>
    </div>
  );
};

export default VerticalBlock;