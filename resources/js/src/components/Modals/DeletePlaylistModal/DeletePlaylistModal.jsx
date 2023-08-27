import React from 'react';
import Modal from '../../Modal/Modal';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NET from '../../../network';

const DeletePlaylistModal = ({ active, setActive, playlist }) => { 
    const { authRequest } = useAuth()
    const navigate = useNavigate()

    const deletePlaylist = () => {
        if (!playlist.id) return
    
        authRequest(() => {
            axios.delete(`${NET.APP_URL}/playlists/${playlist.id}`)
                .then(() => navigate('/playlists'))
        })
    }

    return (
        <Modal active={active} setActive={setActive}>
            <div className='modal__header'>Видалити цей список відтворення?</div>
            <div className='modal__footer'>
                <button onClick={ () => deletePlaylist() }>Видалити</button>
                <button className='modal__cancel' onClick={ () => setActive(false) }>Скасувати</button>
            </div>
        </Modal>
    )
}

export default DeletePlaylistModal;