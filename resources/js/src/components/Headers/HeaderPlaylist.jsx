import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import cn from 'classnames';

import axios from 'axios';
import NET from '../../network';

import { HiArrowLeft } from 'react-icons/hi';
import { GrMoreVertical } from 'react-icons/gr';
import { VscAdd } from 'react-icons/vsc';

import './Header.scss';

const HeaderPlaylist = ({ 
    playlist, getPlaylist, 
    setAddSongToPlaylistModal, setRenamePlaylistModal,
    setDeletePlaylistModal
}) => {
    const navigate = useNavigate()
    const { authRequest } = useAuth()
    const Header = useRef()
    const playlistPreviewInput = useRef()
    const [headerActive, setHeaderActive] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    useEffect(() => {
        document.addEventListener('scroll', headerAnimation)
    }, [playlist])

    const headerAnimation = () => {
        const scrollHeight = window.pageYOffset
        const previewHeight = document.querySelector('.playlist__preview')?.clientHeight

        const offsetPoint = document.querySelector('.playlist__info')?.offsetTop

        if (previewHeight && scrollHeight > offsetPoint) {
            setHeaderActive(true)
            return
        }

        setHeaderActive(false)
    }

    const setPlaylistPreview = (e) => {
        const formData = new FormData()
        formData.append('preview', e.target.files[0])
        
        authRequest(() => {
            axios.post(`${NET.APP_URL}/playlists/${playlist.id}/preview`, formData)  
                .then(() => getPlaylist()) 
        })
    }

    return (
        <header id='header-playlist' className={ cn('header', { 'header_active': headerActive }) }>
            <div className='header__row' ref={Header}>
                <div className='box-icon box-icon_anim' onClick={ () => navigate(-1) }>
                    <HiArrowLeft/>
                </div>
                <div id='header__playlist-title'>{playlist && playlist.name}</div>
            </div>
            <div className='header__row'>
                {playlist && (<>
                    <div className='box-icon box-icon_anim' onClick={ () => setAddSongToPlaylistModal(true) }><VscAdd/></div>
                    <div className='box-icon box-icon_anim header__playlists-more-btn' onClick={ () => setShowSettings(!showSettings) }>
                        <GrMoreVertical/>
                        {/* Settings */}
                        {showSettings && (
                            <div className='header__playlists-settings' onClick={ (e) => e.stopPropagation() }>
                                <label htmlFor='setPlaylistPreview'>Змінити обкладинку списку відтворення</label>
                                <input 
                                    type='file' 
                                    id='setPlaylistPreview' 
                                    accept='image/*,.jpeg,.jpg,.png,.gif' 
                                    ref={playlistPreviewInput} 
                                    onChange={ (e) => setPlaylistPreview(e) }
                                    hidden 
                                />
                                <div onClick={ () => setRenamePlaylistModal(true) }>Перейменувати</div>
                                <div onClick={ () => setDeletePlaylistModal(true) }>Видалити</div>
                            </div>
                        )}
                    </div>
                </>)}
            </div>
        </header>
    )
}

export default HeaderPlaylist;