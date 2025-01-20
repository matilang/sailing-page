import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../App.css';
import TitleBar from '../components/TitleBar';
import SideHeader from '../components/SideHeader';

const EditUser = () => {
  const navigate = useNavigate();
  const pageTitle = 'Edytuj Dane Użytkownika';
  const pageLinks = [
    { text: 'Politechnika Gdańska', href: '/sailing-webpage' },
    { text: 'Sekcja Żeglarska Politechniki Gdańskiej', href: '/sailing-webpage' },
    { text: 'Edytuj Dane Użytkownika', href: '/edituser' },
  ];

  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  // Pobieranie danych użytkownika po załadowaniu komponentu
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/user/user-profile'); // Pobierz dane użytkownika
        setFormData({
          username: response.data.username || '',
          email: response.data.email || '',
        });
      } catch (error) {
        console.error('Błąd podczas pobierania danych użytkownika:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Aktualizuj tylko zmieniane pole
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tworzymy obiekt z danymi bez pustych pól
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value.trim() !== '')
    );

    console.log('Dane wysyłane na serwer:', filteredData);

    try {
      const response = await axios.put('/user/user-profile', filteredData); // Zapisz zmiany na serwerze
      console.log('Zaktualizowano dane użytkownika:', response.data);
      navigate('/edituser');
    } catch (error) {
      console.error('Błąd podczas aktualizacji danych:', error);
      if (error.response) {
        console.error('Serwer odpowiedział:', error.response.data);
      }
    }
  };

  return (
    <div className='main-content'>
      <TitleBar mainTitle={pageTitle} pageLinks={pageLinks} />
      <div className="text">
        <div className="regist">
          <h2>Edytuj dane osobowe</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Nazwa Użytkownika:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="off"
              />
            </label>
            <br />
            <label>
              E-mail:
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
              />
            </label>
            <br />
            <div className='user-button'><button type="submit">Edytuj dane</button></div>
          </form>
        </div>
      </div>
      <SideHeader />
    </div>
  );
};

export default EditUser;
