import React from 'react';
import HorizontalBlock from '../HorizontalBlock/HorizontalBlock';
import styles from './ApiSection.module.css';

const ApiSection = ({ apiData, loading }) => {
  if (loading) {
    return <div className={styles.apiResult}>Загрузка...</div>;
  }

  if (!apiData) {
    return null;
  }

  return (
    <div className={styles.apiResult}>
      {apiData.type === 'cats' && (
        <HorizontalBlock 
          title="Факт о котах" 
          content={apiData.data.fact || "Approximately 24 cat skins can make a coat."}
        />
      )}
      {apiData.type === 'dogs' && (
        <HorizontalBlock 
          title="Случайное фото собаки" 
          content={<img src={apiData.data.message} alt="Random Dog" />}
        />
      )}
      {apiData.type === 'ip' && (
        <HorizontalBlock 
          title="Ваш IP" 
          content={`IP: ${apiData.data.ip}`}
        />
      )}
    </div>
  );
};

export default ApiSection;