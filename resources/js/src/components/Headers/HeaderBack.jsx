import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavMenu from '../NavMenu/NavMenu';

import { HiArrowLeft } from 'react-icons/hi';

import './Header.scss';

const HeaderBack = ({ title }) => {
    const navigate = useNavigate()
    const header = useRef(null)

    useEffect(() => {
        const app = document.querySelector('#app')
        const headerHeight = header.current?.clientHeight
        app.style.paddingTop = `${headerHeight}px`
    }, [])

    return (
        <header id='header-back' className='header' ref={header}>
            <div className='header__row'>
                <div className='box-icon box-icon_anim' onClick={ () => navigate(-1) }>
                    <HiArrowLeft/>
                </div>
            </div>
            <div className='header__menu'>
                <NavMenu/>
            </div>
            <div className='header__title'>
                {title && title}
            </div>
        </header>
    )
}

export default HeaderBack;