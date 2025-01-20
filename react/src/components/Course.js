import React from 'react';
import '../App.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Course = ({ course, isAdmin, isInstructor, isUserPage, isArchived}) => {

  const navigate = useNavigate();


  const handleCourseDetails = (courseId) => {
    localStorage.setItem('courseId', courseId);
    navigate('/detailcourse');
  };

  const handleCourseRegistration = (courseId) => {
    localStorage.setItem('courseId', courseId);
    navigate('/registrationform');
  };

  const handleEditCourse = (courseId) => {
    localStorage.setItem('courseId', courseId);
    navigate(`/editcourseform`);
  };

  const handleNewFormTemplate = (courseId) => {
    localStorage.setItem('courseId', courseId);
    navigate('/newformtemplate');
  };

  const handleArchiveCourse = (courseId) => {
    axios.put(`/courses/archive/${courseId}`)
      .then(response => {
        console.log(response.data)
        localStorage.setItem('courseId', courseId);
        navigate(`/archiviseform`);
      })
    .catch(error => console.error('Error fetching course details:', error));
  };

  const handleUserEditCourse = (courseId) => {
    localStorage.setItem('courseId', courseId);
    navigate('/usereditregistration')
  };

  const handleDeletefromCourses = (courseId) => {
    axios.put(`user/unregister/${courseId}`)
    .then(response => {
      console.log(response);
      window.location.reload();
    } )
    .catch(err => console.error(err))
    navigate('/userpage')
  };

  const handleSignupForFullCourse = (courseId) => {
    axios.post(`/user/instructors/enroll/${courseId}`)
      .then(response => {
        console.log("Zapisano instruktora na cały kurs:", response.data);
        alert("Zostałeś zapisany na cały kurs.");
        window.location.reload();
      })
      .catch(error => {
        console.error("Błąd przy zapisie na cały kurs:", error.response?.data || error.message);
        alert("Nie udało się zapisać na cały kurs. Sprawdź szczegóły.");
      });
  };
  
  const handleSignupForHalfCourse = (courseId) => {
    axios.post(`/user/instructors/enroll-half/${courseId}`)
      .then(response => {
        console.log("Zapisano instruktora na połowę kursu:", response.data);
        alert("Zostałeś zapisany na połowę kursu.");
        window.location.reload();
      })
      .catch(error => {
        console.error("Błąd przy zapisie na połowę kursu:", error.response?.data || error.message);
        alert("Nie udało się zapisać na połowę kursu. Sprawdź szczegóły.");
      });
  };

  return (
    <div className='course-box'>
      <h3>{course.name}</h3>
      <p>{course.description}</p>
      <p>Data rozpoczęcia: {new Date(course.dates[0]).toLocaleDateString()}</p>
      <div className='button-group'>
        <button onClick={() => handleCourseDetails(course._id)}>Szczegóły</button>
        {!isArchived && !isUserPage && !isInstructor && (
            <button onClick={() => handleCourseRegistration(course._id)}>Zapisz się</button>
          )}

          {!isArchived && !isUserPage && isAdmin && (
            <button onClick={() => handleEditCourse(course._id)}>Edytuj Dane</button>
          )}

          { !isArchived && isAdmin && (
            <>
            <button onClick={() => handleNewFormTemplate(course._id)}>Dodaj zapytanie w kursie</button>
            <button onClick={() => handleArchiveCourse(course._id)}>Archiwizuj Kurs</button>
            </>
          )}

          {!isArchived && isUserPage && (
            <>
            <button onClick={() => handleUserEditCourse(course._id)}>Edytuj swoje zgłoszenie</button>
            <button onClick={() => handleDeletefromCourses(course._id)}>Wypisz się</button>
            </>
          )}

          {isInstructor && (
            <>
              <button onClick={() => handleSignupForFullCourse(course._id)}>Zapisz się na cały kurs</button>
              <button onClick={() => handleSignupForHalfCourse(course._id)}>Zapisz się na połowę kursu</button>
            </>
          )}
      </div>
    </div>
  );
};

export const CourseDetails = ({ course }) => {
  if (!course) return null;

  return (
    <div className="course-description">
      <h3>{course.name}</h3>
      <p>{course.description}</p>
      <p>Koszt dla studentów PG: {course.costForStudents}</p>
      <p>Koszt dla pracowników PG: {course.costForWorkers}</p>
      <p>Koszt dla członków AWS: {course.costForAWSMembers}</p>
      <p>Koszt dla pozostałych osób: {course.regularCost}</p>
      <p>Data rozpoczęcia: {new Date(course.dates).toLocaleDateString()}</p>
      <p>Czas trwania: {course.courseDurationDays} dni</p>
      {Array.isArray(course.enrolledStudents) && (
        <p>Liczba zapisanych uczestników: {course.enrolledStudents.length}</p>
      )}
      {Array.isArray(course.instructorOfTheCourse) && (
        <p>Liczba zapisanych instruktorów: {course.instructorOfTheCourse.length}</p>
      )}  
    </div>
  );
};

