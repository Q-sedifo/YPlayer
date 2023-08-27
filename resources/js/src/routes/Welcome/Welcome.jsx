import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import GuestMiddleware from '../../middlewares/GuestMiddleware';
import HeaderAlone from '../../components/Headers/HeaderAlone';

import { PiDownloadSimpleBold } from 'react-icons/pi';

import './Welcome.scss';

const Welcome = () => {

    useEffect(() => {

        // Installing PWA Application
        window.addEventListener('beforeinstallprompt', (e) => {
            // Запобігти відображенню діалогового вікна встановлення за замовчуванням
            e.preventDefault()
            
            // Відображення власного діалогового вікна або кнопки
            const myCustomInstallButton = document.querySelector('#install-app-btn')

            // Перевірка, чи PWA вже встановлено
            if (window.matchMedia('(display-mode: standalone)').matches) {
                myCustomInstallButton.style.display = 'none';
                return
            } 
            
            myCustomInstallButton?.addEventListener('click', () => {
                // Виклик діалогового вікна встановлення
                e.prompt()
            })
        })
    }, [])

    return (
        <GuestMiddleware>
            <HeaderAlone/>
            <div className='welcome'>
                <div className='btns-container'>
                    <div><Link to='/login'><button className='btn btn_default'>Вхід в акаунт</button></Link></div>
                    <div><Link to='/register'><button className='btn btn_default'>Створити обліковий запис</button></Link></div>
                    <div><button id='install-app-btn' className='btn'>Завантажити додаток<div className='box-icon'><PiDownloadSimpleBold/></div></button></div>
                </div>
            </div>
        </GuestMiddleware>
    )
}

export default Welcome;