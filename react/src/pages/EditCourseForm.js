import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideHeader from '../components/SideHeader';
import TitleBar from '../components/TitleBar';

const CreateCourseForm = () => {
  const courseId = localStorage.getItem('courseId');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    costForStudents: 0,
    costForWorkers: 0,
    costForAWSMembers: 0,
    regularCost: 0,
    dates: '',
    courseDurationDays: 0,
  });

  const pageTitle = 'Edytuj kurs';
  const pageLinks = [
    { text: 'Politechnika Gdańska', href: '/sailing-webpage'},
    { text: 'Sekcja Żeglarska Politechniki Gdańskiej', href: '/sailing-webpage'},
    { text: 'Wszystkie kursy', href: '/allcourses'},
    { text: 'Edytuj kurs', href: '/editcourseform'},
  ];

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`/courses/${courseId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/courses/${courseId}`, formData);
      console.log('Course edited successfully:', response.data);
      navigate('/allcourses');
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

  return (
    <div className='main-content'>
      <TitleBar mainTitle={pageTitle} pageLinks={pageLinks} />
      <div className='text'>
        <div className='regist'>
          <h3>Edytuj dane kursu</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Nazwa kursu:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Opis:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Koszt dla Studenta:
              <input
                type="text"
                name="costForStudents"
                value={formData.costForStudents}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Koszt dla instruktorów:
              <input
                type="text"
                name="costForWorkers"
                value={formData.costForWorkers}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Koszt dla członków AWS:
              <input
                type="text"
                name="costForAWSMembers"
                value={formData.costForAWSMembers}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Koszt bez zniżek:
              <input
                type="text"
                name="regularCost"
                value={formData.regularCost}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Data:
              <input
                type="text"
                name="dates"
                value={new Date(formData.dates).toLocaleDateString()}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Czas trwania kursu (dni):
              <input
                type="text"
                name="courseDurationDays"
                value={formData.courseDurationDays}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit">Edytuj Kurs</button>
          </form>
        </div>
      </div>
      <SideHeader />
    </div>
  );
};

export default CreateCourseForm;
