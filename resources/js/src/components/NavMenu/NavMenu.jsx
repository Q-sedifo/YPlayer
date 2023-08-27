import React from 'react';
import { NavLink } from 'react-router-dom';

// Icons
import { MdLibraryMusic, MdOutlineLibraryMusic, MdSettings, MdOutlineSettings } from 'react-icons/md';
import { RiMusicFill, RiMusicLine } from 'react-icons/ri';
import { PiPlaylistFill, PiPlaylistDuotone } from 'react-icons/pi';

const NavMenu = ({ withIcons }) => {
    return (
        <>
            <NavLink to='/'>
                {withIcons && (
                    <>
                        <div className='box-icon box-icon_active box-icon_anim'><MdLibraryMusic/></div>
                        <div className='box-icon box-icon_anim'><MdOutlineLibraryMusic/></div>
                    </>
                )}
                Бібліотека
            </NavLink>
            <NavLink to='/playlists'>
                {withIcons && (
                    <>
                        <div className='box-icon box-icon_active box-icon_anim'><PiPlaylistFill/></div>
                        <div className='box-icon box-icon_anim'><PiPlaylistDuotone/></div>
                    </>
                )}
                Плейлисти
            </NavLink>
            <NavLink to='/songs'>
                {withIcons && (
                    <>
                        <div className='box-icon box-icon_active box-icon_anim'><RiMusicFill/></div>
                        <div className='box-icon box-icon_anim'><RiMusicLine/></div>
                    </>
                )}
                Композиції
            </NavLink>
            <NavLink to='/settings'>
                {withIcons && (
                    <>
                        <div className='box-icon box-icon_active box-icon_anim'><MdSettings/></div>
                        <div className='box-icon box-icon_anim'><MdOutlineSettings/></div>
                    </>
                )}
                Налаштування
            </NavLink>
        </>
    )
}

export default NavMenu;