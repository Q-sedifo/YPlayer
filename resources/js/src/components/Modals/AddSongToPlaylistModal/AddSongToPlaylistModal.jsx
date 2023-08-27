import React, { useState, useEffect } from 'react';
import Modal from '../../Modal/Modal';
import useAuth from '../../../hooks/useAuth';
import cn from 'classnames';
import axios from 'axios';
import NET from '../../../network';

import { AiOutlineCheck } from 'react-icons/ai';

const AddSongToPlaylistModal = ({ active, setActive, playlist, getPlaylist }) => {
    const { authRequest } = useAuth()
    const [songs, setSongs] = useState(null)
    const [foundSongs, setFoundSongs] = useState(null)
    const [searchSongQuery, setSearchSongQuery] = useState('')

    useEffect(() => {
        getAllSongs()

        return () => {
            setFoundSongs(null)
            setSearchSongQuery('')
        }
    }, [active])

    const getAllSongs = () => {
        authRequest(() => {
            axios.get(`${NET.APP_URL}/songs`)
                .then(({data}) => {
                    setSongs(data)
                })
        })
    }

    const toggleSongOfPlaylist = (song) => {
        authRequest(() => {
            axios.post(`${NET.APP_URL}/playlists/toggleSong`, { playlistId: playlist.id, songId: song.id })
                .then(() => getPlaylist())
        })
    }

    const findSong = (e) => {
        const value = e.target.value
        setSearchSongQuery(value)

        if (!value) {
            setFoundSongs(null)
            return
        }

        const filtered = songs.filter(song =>
            song.name.toLowerCase().includes(value.toLowerCase())
        )
        setFoundSongs(filtered)
    }

    return (
        <Modal active={active} setActive={setActive}>
            <div className='modal__header'>Додати композицію</div>
            <input type='text' placeholder='Знайти пісню' value={searchSongQuery} onChange={ (e) => findSong(e)} />
            <div className='modal__checkbox-list'>
                {foundSongs && !foundSongs.length && <div className='modal__message'>Нічого не знайдено</div>}
                {(foundSongs || songs) && (foundSongs || songs).map(song => (
                    <div key={song.id} className='modal__checkbox-item'>
                        <div className='modal__checkbox-name'>{song.name}</div>
                        <div 
                            className={cn('modal__checkbox-btn', { 
                                'modal__checkbox-btn_active': playlist && playlist.songs.some((s) => s.id === song.id) 
                            })}
                            onClick={ () => toggleSongOfPlaylist(song) }
                        >
                        <div className='box-icon'><AiOutlineCheck/></div></div>
                    </div>
                ))}
            </div>
            <div className='modal__footer'>
                <button onClick={ () => setActive(false) }>Готово</button>
            </div>
        </Modal>
    )
}

export default AddSongToPlaylistModal;