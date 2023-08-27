import React, { useState, useEffect } from 'react';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import HeaderBase from '../../components/Headers/HeaderBase';
import NET from '../../network';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import Loader from '../../components/Loader/Loader';
import PlaylistSecondary from '../../components/Playlist/PlaylistSecondary/PlaylistSecondary';
import AddPlaylistModal from '../../components/Modals/AddPlaylistModal/AddPlaylistModal';

import { RiAddCircleFill } from 'react-icons/ri'; 

import './Playlists.scss';

const Playlists = () => {
    const { auth, authRequest } = useAuth()
    const [playlists, setPlaylists] = useState(null)
    const [loading, setLoading] = useState(true)
    const [addPlaylistModal, setAddPlaylistModal] = useState(false)

    useEffect(() => {
        getPlaylists()
    }, [auth])

    const getPlaylists = () => {
        authRequest(() => {
            axios.get(`${NET.APP_URL}/playlists`).then(({data}) => {
                setPlaylists(data)
                setLoading(false)
            })
        })
    }

    return (
        <AuthMiddleware>
            <HeaderBase title='Плейлисти' />
            <div className='playlists container'>
                <button className='playlists__add-btn btn' onClick={ () => setAddPlaylistModal(true) }>
                    Створити новий плейлист
                    <div className='box-icon'><RiAddCircleFill/></div>
                </button>
                {loading && <div className='center'><Loader/></div>}
                <div className='playlists__list'>
                    {playlists && playlists.map(playlist => (
                        <PlaylistSecondary key={playlist.id} playlist={playlist} />
                    ))}
                </div>
            </div>

            {/* Modal from for adding playlist */}
            <AddPlaylistModal active={addPlaylistModal} setActive={setAddPlaylistModal} getPlaylists={getPlaylists}/>
        </AuthMiddleware>
    )
}

export default Playlists;