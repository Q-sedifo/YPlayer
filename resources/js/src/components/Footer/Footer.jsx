import React, { useEffect, useRef } from 'react';
import MobileMenu from '../MobileMenu/MobileMenu';
import Player from '../Player/Player/Player';
import usePlayer from '../../hooks/usePlayer';

import './Footer.scss';

const Footer = () => {
    const { currentAudio } = usePlayer()
    const footer = useRef(null)

    useEffect(() => {
        const app = document.querySelector('#app')
        app.style.paddingBottom = `calc(${footer.current.clientHeight}px + var(--base-padding))`

        return () => {
            app.style.paddingBottom = `0px`
        }
    }, [currentAudio])

    return (
        <footer className='footer' ref={footer}>
            <Player/>
            <MobileMenu/>
        </footer>
    )
}

export default Footer;