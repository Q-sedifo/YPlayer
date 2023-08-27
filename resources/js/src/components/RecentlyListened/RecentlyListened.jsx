import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader/Loader';
import axios from 'axios';
import NET from '../../network';
import PlaylistSecondary from '../Playlist/PlaylistSecondary/PlaylistSecondary';
import SongSecondary from '../Song/SongSecondary/SongSecondary';

const RecentlyListened = () => {
    const { auth, authRequest } = useAuth()
    const [recentSongs, setRecentSongs] = useState({
        loading: true,
        data: null
    })

    useEffect(() => {
        getRecentSongs()
    }, [auth])

    const getRecentSongs = () => {
        authRequest(() => {
            axios.get(`${NET.APP_URL}/songs/recentListened`).then(({data}) => {
                setRecentSongs({ loading: false, data: data })
            })
        })
    } 
    
    return (
        <div className='block'>
            <div className='block__header'><h1>Прослухано недавно</h1></div>
            <div className='center'>{recentSongs.loading && <Loader/>}</div>
            <div className='block__content scrolling'>
                {recentSongs.data && recentSongs.data.length > 0 && (
                    <PlaylistSecondary playlist={recentSongs.data[Math.floor(Math.random() * recentSongs.data.length)].playlists[0]} />
                )}
                {recentSongs.data && recentSongs.data.length === 0 && <div className='block__message'>Немає доступної музики</div>}
                {recentSongs.data && recentSongs.data.map(song => (
                    <SongSecondary key={song.id} song={song} />
                ))}
            </div>
        </div>
    )
}

export default RecentlyListened;