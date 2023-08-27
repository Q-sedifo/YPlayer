import React, { useState, useEffect, useRef } from 'react';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import useAuth from '../../hooks/useAuth';
import SongPrimary from '../../components/Song/SongPrimary/SongPrimary';
import HeaderBack from '../../components/Headers/HeaderBack';
import Loader from '../../components/Loader/Loader';
import DeleteSongModal from '../../components/Modals/DeleteSongModal/DeleteSongModal';
import cn from 'classnames';
import { formatTime } from '../../utilites/Time';
import { getMP3Duration } from '../../utilites/Audio';

import axios from 'axios';
import NET from '../../network';

import { MdOutlineAdd } from 'react-icons/md';

import './Songs.scss';

const Songs = () => {
    const { auth, authRequest } = useAuth()
    const [songs, setSongs] = useState(null)
    const [loading, setLoading] = useState(true)
    const [deleteSongModal, setDeleteSongModal] = useState(null)
    const songsPage = useRef()
    const addSongBtn = useRef(null)

    useEffect(() => {
        getSongs()
    }, [auth])

    const getSongs = () => {
        authRequest(() => {
            axios.get(`${NET.APP_URL}/songs`).then(({data}) => {
                setSongs(data)
                setLoading(false)
            })
        })
    }

    const selectSongs = async (e) => {
        const selectedSongs = e.target.files

        if (selectedSongs) {
            for (const key in selectedSongs) {
                if (selectedSongs.hasOwnProperty(key)) {
                    const formData = new FormData()
                    const value = selectedSongs[key]
                    try {
                        const duration = formatTime(await getMP3Duration(value))

                        formData.append('song', value)
                        formData.append('duration', duration)

                        authRequest(() => {
                            axios.post(`${NET.APP_URL}/songs`, formData)
                                .then(() => getSongs())
                                .catch( err => console.log(err) )
                        })

                    } catch (error) {
                        console.error(error)
                    }
                }
            }
        }
    }

    return (
        <AuthMiddleware>
            <HeaderBack title='Композиції' />
            <div className='songs' ref={songsPage}>
                <div className={cn('container', { 'center': loading })}>
                    {loading && <Loader/>}
                    {songs && (
                        <div className='songs__add-song-btn' onClick={ () => addSongBtn.current.click() }>
                            <div className='box-icon'><MdOutlineAdd/></div>
                            Додати композицію
                            <input 
                                type='file' 
                                id='add-song-btn' 
                                accept='.mp3' 
                                ref={addSongBtn} 
                                onChange={ (e) => selectSongs(e) }
                                multiple hidden 
                            />
                        </div>
                    )}
                    {songs && songs.length === 0 && <div className='block__message'>У вас ще немає музики</div>}
                    {songs && songs.map(song => (
                        <SongPrimary key={song.id} song={song} setDeleteSongModal={setDeleteSongModal}/>
                    ))}
                </div>
            </div>
            <DeleteSongModal active={deleteSongModal ? true : false} setActive={setDeleteSongModal} song={deleteSongModal} getSongs={getSongs}/>
        </AuthMiddleware>
    )
}

export default Songs;
