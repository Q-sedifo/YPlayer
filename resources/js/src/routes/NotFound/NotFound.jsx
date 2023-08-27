import React from 'react';
import HeaderBase from '../../components/Headers/HeaderBase';
import Logo from '../../components/Logo/Logo';

import { BiSad } from 'react-icons/bi';

import './NotFound.scss';

const NotFound = () => {
    return (
        <>
            <HeaderBase/>
            <div className='not-found container center'>
                <div className='not-found__flex'>
                    <div className='box-icon box-icon_large'><BiSad/></div>
                    <h1>Сторінку не знайдено 404</h1>
                </div>
                <div><button className='btn'><Logo/></button></div>
            </div>
        </>
    )
}

export default NotFound;