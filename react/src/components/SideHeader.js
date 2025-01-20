import React from "react";
import { Link } from "react-router-dom";

export default function SideHeader() {

    const isLogged = localStorage.getItem('islogged') === 'true';
    const isAdmin = localStorage.getItem('role') === 'admin';

    return (

        <div className='side-header'>
            <div className='main-header'>
                    <h2><Link to='/sailing-webpage'>Sekcja Żeglarska PG</Link></h2>
            </div>
            <ul className='downpage-list'>
                <li><Link to='/section'>Sekcja</Link></li>
                <li><Link to='/crewpage'>Załoga</Link></li>
                <li><Link to='/partner'>Partnerzy</Link></li>
                <li><Link to='/calendar'>FAQ</Link></li>
                <li><Link to="/allcourses">Wszystkie Kursy</Link></li>
                {isLogged && isAdmin && <li><Link to="/createnewcourse">Stwórz Nowy Kurs</Link></li>}
                {isLogged && isAdmin && <li><Link to="/archiviseform">Archiwum</Link></li>}
                {isLogged && <li><Link to="/userpage">Moje Kursy</Link></li>}
                {isLogged && <li><Link to="/edituser">Edytuj Dane Użytkownika</Link></li>}
                <li className="last"><Link to='/contact'>Kontakt</Link></li>
            </ul>
        </div>
    );
}


