import { useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Signup() {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/auth/register', {username, email, password})
        .then(result => {console.log(result)
            navigate('/login')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='main-content'>
            <div className='log-background'>
                <div className='log-box'>
                    <h2>Rejestracja</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='username'>
                                <strong>Nazwa użytkownika</strong>
                            </label>
                            <input
                              type='text'
                              placeholder='Wpisz nazwę użytkownika'
                              autoComplete='off'
                              name='username'
                              className='inputbox'
                              onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='email'>
                                <strong>Email</strong>
                            </label>
                            <input
                              type='text'
                              placeholder='Wpisz email'
                              autoComplete='off'
                              name='email'
                              className='inputbox'
                              onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='password'>
                                <strong>Hasło</strong>
                            </label>
                            <input
                              type='password'
                              placeholder='Wpisz hasło'
                              autoComplete='off'
                              name='password'
                              className='inputbox'
                              onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type='submit' className='btn-register'>
                            Zarejestruj się
                        </button>
                        </form>
                    <p><Link  to='/login'>Masz już konto?</Link></p>
                </div>
            </div>
        </div>
    );
}
export default Signup
