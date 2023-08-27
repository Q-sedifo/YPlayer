import React from 'react';
import Modal from '../../Modal/Modal';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import NET from '../../../network';

const DeleteSongModal = ({ active, setActive, song, getSongs }) => {
    const { authRequest } = useAuth()

    const deleteSong = (songId) => {
        authRequest(() => {
            axios.delete(`${NET.APP_URL}/songs/${songId}`)
                .then(() => {
                    getSongs()
                    setActive(null)
                })
        })
    }
    
    return (
        <Modal active={active} setActive={setActive}>
            <div className='modal__header'>
                Видалити композицію?
            </div>
            <div>{song && song.name}</div>
            <div className='modal__footer'>
                <button onClick={ () => deleteSong(song.id) }>Видалити</button>
                <button className='modal__cancel' onClick={ () => setActive(null) }>Скасувати</button>
            </div>
        </Modal>
    )
}

export default DeleteSongModal;