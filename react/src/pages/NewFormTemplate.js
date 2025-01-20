import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TitleBar from '../components/TitleBar';
import SideHeader from '../components/SideHeader';

const CreateCourseForm = () => {
  const [formData, setFormData] = useState({
    fieldName: '',
    fieldType: '',
    isRequired: false,
  });

  const courseId = localStorage.getItem('courseId');
  const navigate = useNavigate();

  const pageTitle = 'Dodaj pole zapytania w kursie';
    const pageLinks = [
      { text: 'Politechnika Gdańska', href: '/sailing-webpage'},
      { text: 'Sekcja Żeglarska Politechniki Gdańskiej', href: '/sailing-webpage'},
      { text: 'Wszystkie kursy', href: '/allcourses'},
      { text: 'Dodaj pole zapytania w kursie', href: '/newformtemplate'},
    ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/courses/${courseId}/form-templates`, {fields:[formData]} );
      console.log('New Form Template made successfully:', response.data);
      navigate('/allcourses');
    } catch (error) {
      console.error('Error creating course:', error);

      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
    }
  };

  return (
    <div className='main-content'>
      <TitleBar mainTitle={pageTitle} pageLinks={pageLinks} />
      <div className='text'>
      <div className='regist'>
      <form onSubmit={handleSubmit}>
        <label>
          Nazwa nowej kategorii:
          <input type="text" name="fieldName" value={formData.fieldName} onChange={handleChange} required />
        </label>
        <label>
          Treść:
          <input type="text" name="fieldType" value={formData.fieldType} onChange={handleChange} required />
        </label>
        <label>
          Czy wymagany:
          <input type="checkbox" name="isRequired" checked={formData.isRequired} onChange={handleChange} />
        </label>

        <button type="submit">Utwórz nowe zapytanie</button>
        </form>
      </div>
      </div>
      <SideHeader/>
    </div>
  );
};

export default CreateCourseForm;
