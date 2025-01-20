import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TitleBar from '../components/TitleBar';
import SideHeader from '../components/SideHeader';

const CreateNewCourse = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    costForStudents: 0,
    costForWorkers: 0,
    costForAWSMembers: 0,
    regularCost: 0,
    dates: [],
    courseDurationDays: 0,
  });

  const pageTitle = 'Utwórz nowy kurs';
    const pageLinks = [
      { text: 'Politechnika Gdańska', href: '/sailing-webpage', title: 'Wróć do poprzedniej strony' },
      { text: 'Sekcja Żeglarska Politechniki Gdańskiej', href: '/sailing-webpage', title: 'Wróć do poprzedniej strony' },
      { text: 'Utwórz nowy kurs', href: '/createnewcourse', title: 'Obecna strona'},
    ];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/courses', formData);
      console.log('Course created successfully:', response.data);
      navigate('/sailing-webpage');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (

    <div className='main-content'>
    <TitleBar mainTitle={pageTitle} pageLinks={pageLinks} />
    <div className='text'>
      <h3>Dane nowego kursu</h3>
      <div className='regist'>
      <form onSubmit={handleSubmit}>
          <label>
              Nazwa kursu:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>

          <label>
              Opis:
              <input type="text" name="description" value={formData.description} onChange={handleChange} required />
          </label>

          <label>
              Koszt dla Studenta:
              <input type="text" name="costForStudents" value={formData.costForStudents} onChange={handleChange} required />
          </label>

          <label>
              Koszt dla instruktorów:
              <input type="text" name="costForWorkers" value={formData.costForWorkers} onChange={handleChange} required />
          </label>

          <label>
              Koszt dla członków AWS:
              <input type="text" name="costForAWSMembers" value={formData.costForAWSMembers} onChange={handleChange} required />
          </label>

          <label>
              Koszt bez zniżek:
              <input type="text" name="regularCost" value={formData.regularCost} onChange={handleChange} required />
          </label>

          <label>
              Data:
              <input type="date" name="dates" value={formData.dates} onChange={handleChange} required />
          </label>

          <label>
              Czas trwania kursu (dni):
              <input type="text" name="courseDurationDays" value={formData.courseDurationDays} onChange={handleChange} required />
          </label>

        <button type="submit">Stwórz nowy kurs</button>
        </form>
        </div>
      </div>
      <SideHeader/>
      </div>

  );
};

export default CreateNewCourse;