import React from 'react';
import styles from './ContactBlock.module.css';

const ContactBlock = ({ email, phone, socialMedia, editMode, onEmailChange, onPhoneChange, onSocialMediaChange }) => {
  return (
    <section className={styles.contactBlock}>
      <h2 className={`${styles.editable} ${editMode ? styles.editMode : ''}`}>Контакты</h2>
      <p>
        <strong>Email:</strong>{' '}
        <span 
          className={`${styles.editable} ${editMode ? styles.editMode : ''}`}
          contentEditable={editMode}
          onBlur={(e) => onEmailChange(e.target.textContent)}
          suppressContentEditableWarning={true}
        >
          {email}
        </span>
      </p>
      <p>
        <strong>Телефон:</strong>{' '}
        <span 
          className={`${styles.editable} ${editMode ? styles.editMode : ''}`}
          contentEditable={editMode}
          onBlur={(e) => onPhoneChange(e.target.textContent)}
          suppressContentEditableWarning={true}
        >
          {phone}
        </span>
      </p>
      <p>
        <strong>Социальные сети:</strong>{' '}
        <span 
          className={`${styles.editable} ${editMode ? styles.editMode : ''}`}
          contentEditable={editMode}
          onBlur={(e) => onSocialMediaChange(e.target.textContent)}
          suppressContentEditableWarning={true}
        >
          {socialMedia}
        </span>
      </p>
    </section>
  );
};

export default ContactBlock;