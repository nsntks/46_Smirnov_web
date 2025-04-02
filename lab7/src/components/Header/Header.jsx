import React from 'react';
import styles from './Header.module.css';

const Header = ({ onApiButtonClick }) => {
  return (
    <header className={styles.header}>
      <div className={styles.siteName}>какие-то API функции</div>
      <nav className={styles.nav}>
        <button onClick={() => onApiButtonClick('cats')}>Коты</button>
        <button onClick={() => onApiButtonClick('dogs')}>Собаки</button>
        <button onClick={() => onApiButtonClick('ip')}>IP-адрес</button>
      </nav>
    </header>
  );
};

export default Header;