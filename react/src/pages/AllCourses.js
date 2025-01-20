import React, { useState, useEffect } from 'react';
import {Course} from '../components/Course';
import SideHeader from '../components/SideHeader';
import TitleBar from '../components/TitleBar';
import axios from 'axios';
import '../App.css'

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAdmin = localStorage.getItem('role') === 'admin';
  const isInstructor = localStorage.getItem('role') === 'instructor';


  const pageTitle = 'Wszystkie Kursy';
    const pageLinks = [
      { text: 'Politechnika Gdańska', href: '/sailing-webpage'},
      { text: 'Sekcja Żeglarska Politechniki Gdańskiej', href: '/sailing-webpage'},
      { text: 'Wszystkie kursy', href: '/allcourses'},
    ];


  useEffect(() => {
    axios.get('/courses')
      .then(response => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load courses. Please try again later.');
        setLoading(false);
      });
  }, []);

  const notArchivedCourses = courses.filter(course => course.isArchived === false);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>{error}</p>;

  return (
  <div className='main-content'>
    <TitleBar mainTitle={pageTitle} pageLinks={pageLinks} />
    <div className='text'>
      <h1>Lista Kursów</h1>
      <div className='course-list'>
        {notArchivedCourses.map(course => (
          <Course
            key={course._id}
            course={course}
            isAdmin={isAdmin}
            isInstructor={isInstructor}
          />
        ))}
      </div>
    </div>
    <SideHeader/>
  </div>
  );
};

export default AllCourses;
