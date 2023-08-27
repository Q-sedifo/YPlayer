import React, { useState, useEffect } from 'react';
import Modal from '../../Modal/Modal';
import Loader from '../../Loader/Loader';
import useAuth from '../../../hooks/useAuth';
import NET from '../../../network';
import axios from 'axios';

const AddPlaylistModal = ({ active, setActive, getPlaylists }) => {
    const { authRequest } = useAuth()
    const [modal, setModal] = useState({
        data: '',
        errors: [],
        loading: false
    })

    useEffect(() => {
        return () => {
            setModal({ data: '', errors: [], loading: false })
        }
    }, [active])

    const addNewPlaylist = (e) => {
        e.stopPropagation()
        setModal({ ...modal, loading: true })
        
        authRequest(() => {
            axios.post(`${NET.APP_URL}/playlists`, { name: modal.data })
                .then(() => {
                    setActive(false)
                    getPlaylists()
                })
                .catch(({response}) => {
                    const errors = response.data.errors
                    setModal({ ...modal, errors: errors, loading: false })
                })
        })
    }

    return (
        <Modal active={active} setActive={setActive}>
            <div className='modal__header'>
                Створити новий список відтворення
                {modal.loading && <Loader/>}
            </div>
            <div className='modal__error'>{modal.errors.name && modal.errors.name}</div>
            <input type='text' placeholder='Назва' onChange={ (e) => setModal({ ...modal, data: e.target.value }) } />
            <div className='modal__footer'>
                <button onClick={ (e) => addNewPlaylist(e) }>Створити</button>
                <button className='modal__cancel' onClick={ () => setActive(false) }>Скасувати</button>
            </div>
        </Modal>
    )
}

export default AddPlaylistModal;
