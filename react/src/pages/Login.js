import '../App.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/auth/login', {username, password})
    .then(result => {
        console.log('Id :', result)
        console.log(result.data.message)
        if(result.data.message === 'Login successful') {
                navigate('/sailing-webpage');
                localStorage.setItem('islogged','true')
                localStorage.setItem('role', result.data.user.role)
                console.log(localStorage.getItem('islogged'))
              }
            })
            .catch(err => console.log(err))
  }


    return (
    <div className='main-content'>
        <div className='log-background'>
            <div className='log-box'>
                <h2>Logowanie</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='username'>
                            <strong>Nazwa Użytkownika</strong>
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
                    <button className='btn-login'>Zaloguj</button>
                    </form>
                <p><Link  to='/signup'>Nie posiadasz jeszcze konta?</Link></p>
            </div>
        </div>
    </div>
  );
}

export default Login;
