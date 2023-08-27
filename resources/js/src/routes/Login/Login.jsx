import React, { useState } from 'react';
import axios from 'axios';
import NET from '../../network';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import GuestMiddleware from '../../middlewares/GuestMiddleware';
import HeaderAlone from '../../components/Headers/HeaderAlone';
import Loader from '../../components/Loader/Loader';
import { CSSTransition } from 'react-transition-group';

import './Login.scss';

const Login = () => {
    const navigate = useNavigate()
    const { authenticate } = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
        nickname: '',
        password: ''
    })

    const login = (e) => {
        e.preventDefault()

        setLoading(true)

        axios.post(`${NET.APP_URL}/login`, userData)
            .then(({data}) => {
                authenticate(data)
                navigate('/')
            })
            .catch(({response}) => {
                const error = response.data.error
                setError(error)

                setTimeout(() => {
                    setError(null)
                }, 3000)
            })
            .finally(() => setLoading(false))
    }

    return (
        <GuestMiddleware>
            <HeaderAlone withReturn={true}/>
            <div className='login'>
                <form className='form_base'>
                    <div className='form_base__header'>
                        <h1>Вхід в обліковий запис</h1>
                        {loading && <Loader/>}
                    </div>
                    <div className='form_base__content'>
                        <div className='form_base__section'>
                            <CSSTransition in={error ? true : false} timeout={500} classNames='appearance' unmountOnExit>
                                <div className='form_base__error'>{error}</div>
                            </CSSTransition>
                            <input type='text' placeholder='Нікнейм' onChange={ e => setUserData({ ...userData, nickname: e.target.value }) } />
                        </div>
                        <div className='form_base__section'>
                            <input type='password' placeholder='Пароль' onChange={ e => setUserData({ ...userData, password: e.target.value }) } />
                        </div>
                    </div>
                    <div className='form_base__footer'>
                        <button className='btn' onClick={ e => login(e) }>Увійти</button>
                    </div>
                </form>
            </div>
        </GuestMiddleware>
    )
}

export default Login;