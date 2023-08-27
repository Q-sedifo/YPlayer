import React, { useState } from 'react';
import GuestMiddleware from '../../middlewares/GuestMiddleware';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NET from '../../network';
import HeaderAlone from '../../components/Headers/HeaderAlone';
import Loader from '../../components/Loader/Loader';
import { CSSTransition } from 'react-transition-group';

import './Register.scss';

const Register = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
        nickname: '',
        password: ''
    })

    const register = (e) => {
        e.preventDefault()

        setLoading(true)

        axios.post(`${NET.APP_URL}/register`, userData)
            .then(() => navigate('/login'))
            .catch(({response}) => {
                const errors = response.data.errors
                setErrors(errors)

                setTimeout(() => {
                    setErrors([])
                }, 3000)
            })
            .finally(() => setLoading(false))
    } 
   
    return (
        <GuestMiddleware>
            <HeaderAlone withReturn={true}/>
            <div className='register'>
                <form className='form_base'>
                    <div className='form_base__header'>
                        <h1>Створення облікового запису</h1>
                        {loading && <Loader/>}
                    </div>
                    <div className='form_base__content'>
                        <div className='form_base__section'>
                            <CSSTransition in={errors.nickname ? true : false} timeout={500} classNames='appearance' unmountOnExit>
                                <div className='form_base__error'>{errors.nickname}</div>
                            </CSSTransition>
                            <input type='text' placeholder='Нікнейм' onChange={ e => setUserData({ ...userData, nickname: e.target.value }) } />
                        </div>
                        <div className='form_base__section'>
                            <CSSTransition in={errors.password ? true : false} timeout={500} classNames='appearance' unmountOnExit>
                                <div className='form_base__error'>{errors.password}</div>
                            </CSSTransition>
                            <input type='password' placeholder='Пароль' onChange={ e => setUserData({ ...userData, password: e.target.value }) } />
                        </div>
                    </div>
                    <div className='form_base__footer'>
                        <button className='btn' onClick={ e => register(e) }>Створити акаунт</button>
                    </div>
                </form>
            </div>
        </GuestMiddleware>
    )
}

export default Register;