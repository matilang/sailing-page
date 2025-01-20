import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import SideHeader from "../components/SideHeader";
import TitleBar from "../components/TitleBar";

const UserEditCourse = () => {
  const courseId = localStorage.getItem("courseId");
  const navigate = useNavigate();
  const pageTitle = "Edytuj Kurs";
  const pageLinks = [
    { text: "Politechnika Gdańska", href: "/sailing-webpage" },
    { text: "Sekcja Żeglarska Politechniki Gdańskiej", href: "/sailing-webpage" },
    { text: "Moje Kursy", href: "/userpage" },
    { text: "Edytuj Kurs", href: "/usereditcourse" },
  ];

  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Pobierz dane kursu i uzupełnione dane użytkownika
  useEffect(() => {
    const fetchCourseAndFormData = async () => {
      try {
        // Pobranie szczegółów kursu
        const courseResponse = await axios.get(`/courses/${courseId}`);
        setCourse(courseResponse.data);

        // Pobranie danych rejestracyjnych użytkownika
        const formResponse = await axios.get(`/user/form-registration/${courseId}`);
        setFormData(formResponse.data.fields[0]); // Używamy fields[0] w przypadku, gdy jest tylko jeden obiekt
      } catch (error) {
        console.error("Error fetching course or registration data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseAndFormData();
  }, [courseId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dane do zapisu:", formData);

    axios
      .put(`/user/form-registration/${courseId}`, { fields: [formData] }) // Wysyłamy tablicę z formData
      .then((result) => {
        console.log(result);
        navigate("/userpage");
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          console.error("Server responded with:", err.response.data);
        }
      });
  };

  if (isLoading) {
    return <div className="main-content">Ładowanie danych...</div>;
  }

  if (!formData) {
    return <div className="main-content">Brak danych do edycji.</div>;
  }

  return (
    <div className="main-content">
      <TitleBar mainTitle={pageTitle} pageLinks={pageLinks} />
      <div className="text">
        <div className="regist">
          <h2>Formularz Zapisu na Kurs Żeglarski - Edycja</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Imię:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
              />
            </label>
            <br />
            <label>
              Koszt kursu:
              <select
                name="cost"
                value={formData.cost}
                onChange={handleChange}>
                {course && (
                  <>
                    <option value={course.costForStudents}>Student PG - {course.costForStudents} zł</option>
                    <option value={course.costForWorkers}>Instruktor - {course.costForWorkers} zł</option>
                    <option value={course.costForAWSMembers}>Członek AWS - {course.costForAWSMembers} zł</option>
                    <option value={course.regularCost}>Bez zniżek - {course.regularCost} zł</option>
                  </>
                )}
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
                autoComplete="off"
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
              />
            </label>
            <br />
            <label>
              Rozmiar koszulki:
              <select
                name="tShirtSize"
                value={formData.tShirtSize}
                onChange={handleChange}
              >
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
              >
                <option value="vegan">Wegańska</option>
                <option value="vegetarian">Wegetariańska</option>
                <option value="regular">Standardowa</option>
              </select>
            </label>
            <br />
            <label>
              Źródło polecające:
              <select
                name="referringSource"
                value={formData.referringSource}
                onChange={handleChange}
              >
                <option value="friends">Znajomi</option>
                <option value="web">Strona internetowa</option>
                <option value="socialMedia">Media społecznościowe</option>
              </select>
            </label>
            <br />
            <button type="submit">Edytuj uzupełnione dane</button>
          </form>
        </div>
      </div>
      <SideHeader />
    </div>
  );
};

export default UserEditCourse;
