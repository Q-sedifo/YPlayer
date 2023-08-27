import React, { useEffect, useRef } from 'react';
import Logo from '../Logo/Logo';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import NavMenu from '../NavMenu/NavMenu';
import { changeAlfaRgba } from '../../utilites/Color';

const HeaderBase = () => {
    const { auth } = useAuth()
    const { animatedBackground } = useTheme()
    const header = useRef()

    useEffect(() => {
        const app = document.querySelector('#app')
        const headerHeight = header.current?.clientHeight
        app.style.paddingTop = `${headerHeight}px`

        // Header animation while scrolling
        headerAnimation()
        document.addEventListener('scroll', headerAnimation)

        return () => {
            app.style.paddingTop = `0px`
            document.removeEventListener('scroll', headerAnimation)
        }
    }, [animatedBackground])

    const headerAnimation = () => {
        const scrollPercent = (window.pageYOffset / 100) * 100
        let integer = Math.round(scrollPercent.toFixed(1) / 10) * 10
        
        if (integer > 100) integer = 100

        const newAlpha = integer / 100
        const reverseNewAlpha = 1 + -newAlpha

        const rootStyles = getComputedStyle(document.documentElement)
        const primaryColor = rootStyles.getPropertyValue('--primary')
        const custom = rootStyles.getPropertyValue('--custom')

        const newPrimaryColor = changeAlfaRgba(primaryColor, newAlpha)
        const NewCustom = changeAlfaRgba(custom, reverseNewAlpha)

        const app = document.querySelector('#app')

        if (animatedBackground) {
            app.style.background = `linear-gradient(190deg, ${NewCustom} 0%, rgba(255, 255, 255, 0) 50%)`
            app.style.backgroundSize = '1500%'
            app.style.animation = 'gradient 40s infinite linear'
        }

        header.current && (header.current.style.backgroundColor = newPrimaryColor)
    }

    return (
        <header className='header' ref={header}>
            <Logo/>
            <div className='header__menu'>
                <NavMenu/>
            </div>
            {auth && (
                <div className='header__user-name'>{auth.nickname}</div>
            )}
        </header>
    )
}

export default HeaderBase;