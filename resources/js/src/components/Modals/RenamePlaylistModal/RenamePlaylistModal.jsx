import React, { useState, useEffect } from 'react';
import Modal from '../../Modal/Modal';
import Loader from '../../Loader/Loader';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import NET from '../../../network';

const RenamePlaylistModal = ({ active, setActive, playlist, getPlaylist }) => {
    const { authRequest } = useAuth()
    const [playlistName, setPlaylistName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        playlist && setPlaylistName(playlist.name)
        
        return () => {
            setError('')
        }
    }, [active, playlist])

    const renamePlaylist = () => {
        setLoading(true)

        authRequest(() => {
            axios.patch(`${NET.APP_URL}/playlists/${playlist.id}/rename`, { name: playlistName })
                .then(() => {
                    getPlaylist()
                    setActive(false)
                })
                .catch(({response}) => {
                    if (response && response.data) {
                        const error = response.data.message
                        setError(error)
                    }
                })
                .finally(() => setLoading(false))
        })
    }

    return (
        <Modal active={active} setActive={setActive}>
            <div className='modal__header'>
                Перейменувати список відтворення
                {loading && <Loader/>}
            </div>
            <div className='modal__error'>{error && error}</div>
            <input type='text' defaultValue={playlist && playlist.name} onChange={ (e) => setPlaylistName(e.target.value) }/>
            <div className='modal__footer'>
                <button onClick={ () => renamePlaylist() }>Перейменувати</button>
                <button className='modal__cancel' onClick={ () => setActive(false) }>Скасувати</button>
            </div>
        </Modal>
    )
}

export default RenamePlaylistModal;