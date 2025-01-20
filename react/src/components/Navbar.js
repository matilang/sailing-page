import React, {useRef} from 'react'
import '../App.css';
import logo from '../images/pg-logotyp.svg'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { sideNavLinks, mainNavLinks } from './NavBarLinks';

function Navbar() {
  const navRef = useRef()
  const navigate = useNavigate()

  const LogoutUser = () => {
    axios.get('/auth/logout').then(response => {
      console.log(response)
      localStorage.setItem('islogged', false)
      localStorage.setItem('role','student')
      navigate('/sailing-webpage');
      window.location.reload();

    })
    .catch(err => console.log(err))
  }
  const isLogged = localStorage.getItem('islogged') === 'true';
  console.log(localStorage.getItem('islogged'))

  return (


    <header>
      <div className='logo-bar'>
        <div className='site-logo'>
          <Link to='/sailing-webpage'>
          <img src={logo} alt=''></img>
          </Link>
        </div>
      </div>
      <div className='main-bar'>
        {isLogged ? (
              <button className='btn' onClick={LogoutUser}>Wyloguj się</button>
        ) : (
          <button className='btn'>
              <Link to='/signup'>Zaloguj się</Link>
            </button>
        )}
            <div id='side-nav'>
              <div className='side-nav'>
                <nav ref={navRef}>
                  <ul className="side-nav">
                    {sideNavLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
            <div id='main-nav'>
              <nav ref={navRef}>
                <ul className="main-nav">
                  {mainNavLinks.map((link, index) => (
                  <li key={index} className="bar-style">
                    <Link to={link.to}>{link.label}</Link>
                      {link.subLinks && (
                        <ul className="list-styled">
                          {link.subLinks.map((subLink, subIndex) => (
                            <li key={subIndex}>
                              <Link to={subLink.to}>{subLink.label}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                  ))}
                </ul>
              </nav>
            </div>
      </div>

    </header>
   );
}

export default Navbar;
