import React from 'react';
import Logo from '../Logo/Logo';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import './Header.scss';

const HeaderAlone = ({ withReturn }) => {
    const navigate = useNavigate()

    return (
        <header className='header'>
            {withReturn && (
                <div className='box-icon box-icon_anim' onClick={ () => navigate('/') }>
                    <HiArrowLeft/>
                </div>
            )}
            <Logo/>
        </header>
    )
}

export default HeaderAlone;