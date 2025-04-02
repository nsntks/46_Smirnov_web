import React, { useState, useEffect } from 'react';
import { store } from './store/store';
import Header from './components/Header/Header';
import VerticalBlock from './components/VerticalBlock/VerticalBlock';
import HorizontalBlock from './components/HorizontalBlock/HorizontalBlock';
import ContactBlock from './components/ContactBlock/ContactBlock';
import ApiSection from './components/ApiSection/ApiSection';
import './App.css';

const App = () => {
  const [state, setState] = useState(store.getState());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    return () => unsubscribe();
  }, []);

  const toggleEditMode = () => {
    store.dispatch({ type: 'TOGGLE_EDIT_MODE' });
  };

  const updateProfileData = (field, value) => {
    store.dispatch({ 
      type: 'UPDATE_PROFILE_DATA', 
      payload: { [field]: value } 
    });
  };

  const handleApiButtonClick = async (type) => {
    setLoading(true);
    store.dispatch({ type: 'SET_API_DATA', payload: null });

    try {
      let url, data;
      switch (type) {
        case 'cats':
          url = 'https://catfact.ninja/fact';
          break;
        case 'dogs':
          url = 'https://dog.ceo/api/breeds/image/random';
          break;
        case 'ip':
          url = 'https://api.ipify.org?format=json';
          break;
        default:
          return;
      }

      const response = await fetch(url);
      data = await response.json();
      
      store.dispatch({ 
        type: 'SET_API_DATA', 
        payload: { type, data } 
      });
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header onApiButtonClick={handleApiButtonClick} />
      
      <button 
        id="toggle-edit-mode" 
        onClick={toggleEditMode}
      >
        {state.editMode ? 'Режим просмотра' : 'Режим редактирования'}
      </button>

      <div id="profile-card" className={state.editMode ? 'edit-mode' : ''}>
        <VerticalBlock
          image={state.profileData.image}
          introText={state.profileData.introText}
          editMode={state.editMode}
          onTextChange={(value) => updateProfileData('introText', value)}
        />

        <div className="horizontal-blocks">
          <HorizontalBlock
            title="Образование"
            content={state.profileData.education}
            editMode={state.editMode}
            onContentChange={(value) => updateProfileData('education', value)}
          />
          <HorizontalBlock
            title="Награды"
            content={state.profileData.awards}
            editMode={state.editMode}
            onContentChange={(value) => updateProfileData('awards', value)}
          />
          <HorizontalBlock
            title="Личная жизнь"
            content={state.profileData.personalLife}
            editMode={state.editMode}
            onContentChange={(value) => updateProfileData('personalLife', value)}
          />
        </div>

        <ContactBlock
          email={state.profileData.email}
          phone={state.profileData.phone}
          socialMedia={state.profileData.socialMedia}
          editMode={state.editMode}
          onEmailChange={(value) => updateProfileData('email', value)}
          onPhoneChange={(value) => updateProfileData('phone', value)}
          onSocialMediaChange={(value) => updateProfileData('socialMedia', value)}
        />
      </div>

      <ApiSection 
        apiData={state.apiData} 
        loading={loading} 
      />
    </div>
  );
};

export default App;