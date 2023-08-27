import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader/Loader';
import SongSecondary from '../Song/SongSecondary/SongSecondary';
import axios from 'axios';
import NET from '../../network';

const Popular = () => {
    const { auth, authRequest } = useAuth()
    const [popularSongs, setPopularSongs] = useState({
        loading: true,
        data: null
    })

    useEffect(() => {
        getPopularSongs()
    }, [auth])

    const getPopularSongs = () => {
        authRequest(() => {
            axios.get(`${NET.APP_URL}/songs/popular`).then(({data}) => {
                setPopularSongs({ loading: false, data: data })
            })
        })
    }

    return (
        <div className='block'>
            <div className='block__header'><h1>Популярне</h1></div>
            {popularSongs.loading && <div className='center'><Loader/></div>}
            <div className='block__content scrolling'>
                {popularSongs.data && popularSongs.data.length === 0 && <div className='block__message'>Немає доступної музики</div>}
                {popularSongs.data && popularSongs.data.map(song => (
                    <SongSecondary key={song.id} song={song} />
                ))}
            </div>
        </div>
    )
}

export default Popular;