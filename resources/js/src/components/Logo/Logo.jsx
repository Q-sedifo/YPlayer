import React from 'react';
import svg from '/public/yplayer.svg';
import { useNavigate } from 'react-router-dom';

import './Logo.scss'; 

const Logo = () => {
    const navigate = useNavigate()

    return (
        <div className='logo' onClick={ () => navigate('/') }>
            <img src={svg} className='logo__img' />
            <span className='logo__text'>Player</span>
        </div>
    )
}

export default Logo;