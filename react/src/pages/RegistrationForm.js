import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../App.css';
import TitleBar from '../components/TitleBar';
import SideHeader from '../components/SideHeader';

const RegistrationForm = () => {

  const courseId = localStorage.getItem('courseId');
  const navigate = useNavigate();
  const pageTitle = 'Zapisz się na kurs';
  const pageLinks = [
    { text: 'Politechnika Gdańska', href: '/sailing-webpage' },
    { text: 'Sekcja Żeglarska Politechniki Gdańskiej', href: '/sailing-webpage' },
    { text: 'Wszystkie kursy', href: '/allcourses' },
    { text: 'Zapisz się na kurs', href: '/registrationform' },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    pesel: "",
    phoneNumber: "",
    cost: "",
    date: "",
    email: "",
    studentIdNumber: "",
    azsPgMembershipCardNumber: "",
    tShirtSize: "",
    meals: "",
    referringSource: "",
  });

  const [courseCosts, setCourseCosts] = useState({
    student: 0,
    worker: 0,
    awsMember: 0,
    regular: 0,
  });

  // Pobranie kosztów kursu z API
  useEffect(() => {
    axios.get(`/courses/${courseId}`)
      .then(response => {
        const { costForStudents, costForWorkers, costForAWSMembers, regularCost } = response.data;
        setCourseCosts({
          student: costForStudents,
          worker: costForWorkers,
          awsMember: costForAWSMembers,
          regular: regularCost,
        });
      })
      .catch(error => console.error('Error fetching course details:', error));
  }, [courseId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Przekształcenie danych formularza do formatu, który jest wymagany przez backend
    const fields = [
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        pesel: formData.pesel,
        phoneNumber: formData.phoneNumber,
        cost: formData.cost,
        date: formData.date,
        email: formData.email,
        studentIdNumber: formData.studentIdNumber,
        azsPgMembershipCardNumber: formData.azsPgMembershipCardNumber,
        tShirtSize: formData.tShirtSize,
        meals: formData.meals,
        referringSource: formData.referringSource,
      },
    ];

    const requestData = {
      courseId,
      userId: localStorage.getItem('userId'),
      fields,
    };

    console.log("Dane do zapisu:", requestData);

    axios.post(`/user/register/${courseId}`, requestData)
      .then((result) => {
        console.log(result);
        console.log('Dane z odpowiedzi:', result.data);
        navigate('/userpage');
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          console.error('Server responded with:', err.response.data);
        }
      });
  };

  return (
    <div className='main-content'>
      <TitleBar mainTitle={pageTitle} pageLinks={pageLinks} />
      <div className='text'>
        <div className='regist'>
          <h3>Formularz Zapisu na Kurs Żeglarski</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Imię:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                autoComplete='off'
              />
            </label>
            <br />
            <label>
              Nazwisko:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                autoComplete='off'
              />
            </label>
            <br />
            <label>
              PESEL:
              <input
                type="text"
                name="pesel"
                value={formData.pesel}
                onChange={handleChange}
                autoComplete='off'
              />
            </label>
            <br />
            <label>
              Numer telefonu:
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                autoComplete='off'
              />
            </label>
            <br />
            <label>
              Koszt kursu:
              <select
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                autoComplete='off'>
                <option value={courseCosts.student}>{`Student PG - ${courseCosts.student} zł`}</option>
                <option value={courseCosts.worker}>{`Pracownik PG - ${courseCosts.worker} zł`}</option>
                <option value={courseCosts.awsMember}>{`Członek AWS - ${courseCosts.awsMember} zł`}</option>
                <option value={courseCosts.regular}>{`Bez zniżek - ${courseCosts.regular} zł`}</option>
              </select>
            </label>
            <br />
            <label>
              Data rozpoczęcia:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                autoComplete='off'
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete='off'
              />
            </label>
            <br />
            <label>
              Numer legitymacji studenckiej:
              <input
                type="text"
                name="studentIdNumber"
                value={formData.studentIdNumber}
                onChange={handleChange}
                autoComplete='off'
              />
            </label>
            <br />
            <label>
              Numer karty członkowskiej AZS PG:
              <input
                type="text"
                name="azsPgMembershipCardNumber"
                value={formData.azsPgMembershipCardNumber}
                onChange={handleChange}
                autoComplete='off'
              />
            </label>
            <br />
            <label>
              Rozmiar koszulki:
              <select
                name="tShirtSize"
                value={formData.tShirtSize}
                onChange={handleChange}
                autoComplete='off'
              >
                <option value="">Wybierz rozmiar</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </label>
            <br />
            <label>
              Posiłki:
              <select
                name="meals"
                value={formData.meals}
                onChange={handleChange}
                autoComplete='off'
              >
                <option value="">Wybierz dietę</option>
                <option value="wegetariańska">Wegetariańska</option>
                <option value="mięsna">Mięsna</option>
                <option value="wege-vegan">Wegetariańska/Vegan</option>
              </select>
            </label>
            <br />
            <label>
              Źródło polecające:
              <select
                name="referringSource"
                value={formData.referringSource}
                onChange={handleChange}
                autoComplete='off'
              >
                <option value="">Wybierz źródło</option>
                <option value="przyjaciel">Przyjaciel</option>
                <option value="internet">Internet</option>
                <option value="uczelnia">Uczelnia</option>
                <option value="inne">Inne</option>
              </select>
            </label>
            <br />
            <button type="submit">Zapisz się na kurs</button>
          </form>
        </div>
      </div>
      <SideHeader />
    </div>
  );
};

export default RegistrationForm;
