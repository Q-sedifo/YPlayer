import React from 'react';
import usePlayer from '../../../hooks/usePlayer';

import { AiFillPlayCircle } from 'react-icons/ai';

import './SongTertiary.scss';

const SongTertiary = ({ song, width, height }) => {
    const { setAudio } = usePlayer()

    return (
        <div className='song-tertiary' style={{ width: `${width}px`, height: `${height}px` }} onClick={ () => setAudio(song) }>
            <div className='box-icon'><AiFillPlayCircle/></div>
            <div className='song-tertiary__name'>{song && song.name}</div>
        </div>
    )
}

export default SongTertiary;
