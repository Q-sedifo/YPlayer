import React, { useState } from 'react';
import usePlayer from '../../../hooks/usePlayer';
import useAuth from '../../../hooks/useAuth';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';

import axios from 'axios';
import NET from '../../../network';


import { IoMdMusicalNote } from 'react-icons/io'; 
import { GrMoreVertical } from 'react-icons/gr';
import { BiDownload } from 'react-icons/bi';
import { MdOutlinePlaylistRemove, MdRemoveCircle } from 'react-icons/md';
import MusicBars from '../../MusicBars/MusicBars';

import './SongPrimary.scss';

const SongPrimary = ({ song, playlist, getPlaylist, setDeleteSongModal }) => {
    const { currentAudio, setAudio } = usePlayer()
    const { authRequest } = useAuth()
    const [removed, setRemoved] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    const removeSongFromPlaylist = (e, songId, playlistId) => {
        e.stopPropagation()

        setRemoved(true)

        authRequest(() => {
            axios.post(`${NET.APP_URL}/playlists/removeSong`, { songId, playlistId })
                .then(() => getPlaylist())
        })
    }

    const settingsShow = (e) => {
        e.stopPropagation() 

        setShowSettings(!showSettings)
    }

    const showDeleteSongModal = (e, song) => {
        e.stopPropagation()

        setDeleteSongModal(song)
    }

    return (
        <div 
            className={cn(`song-primary song-primary_${song.id}`, {
                'song-primary_active': currentAudio && currentAudio.id == song.id,
                'song-primary_removed': removed
            })}
            onClick={ () => setAudio(song) }
        >
            <div className='song-primary__left-side'>
                <div className='song-primary__preview'>
                    <div className='box-icon'><IoMdMusicalNote/></div>
                    <MusicBars/>
                </div>
                <div className='song-primary__info'>
                    <div className='song-primary__name'>{song && song.name}</div>
                    <div className='song-primary__duration'>{song && song.duration}</div>
                </div>
            </div>
            <div className='song-primary__right-side'>
                <div className='box-icon song-primary__more-btn' onClick={ (e) => settingsShow(e) }><GrMoreVertical/></div>
                <CSSTransition in={showSettings} timeout={500} classNames='slide-in' unmountOnExit>
                    <div className='song-primary__settings'>
                        <a href={song.path} download onClick={ (e) => e.stopPropagation() }>
                            <div className='box-icon'><BiDownload/></div>
                        </a>
                        {!playlist && (
                            <div className='box-icon' onClick={ (e) => showDeleteSongModal(e, song) }><MdRemoveCircle/></div>
                        )}
                        {playlist && (
                            <div className='box-icon' onClick={ (e) => removeSongFromPlaylist(e, song.id, playlist.id) }><MdOutlinePlaylistRemove/></div>
                        )}
                    </div>
                </CSSTransition>
            </div>
        </div>
    )
}

export default SongPrimary;