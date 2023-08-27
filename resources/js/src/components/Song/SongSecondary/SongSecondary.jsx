import React from 'react';
import cn from 'classnames';
import MusicBars from '../../MusicBars/MusicBars';
import usePlayer from '../../../hooks/usePlayer';
import { IoMdMusicalNote } from 'react-icons/io'; 

import './SongSecondary.scss';

const SongSecondary = (props) => {
    const { setAudio, currentAudio } = usePlayer()
    const { song } = props

    return (
        <div
            className={cn('song-secondary', {
                'song-secondary_active': currentAudio && currentAudio.id == song.id
            })} 
            onClick={ (e) => setAudio(song) }
        >
            <div className='song-secondary__preview'>
                <MusicBars/>
                <div className='box-icon'><IoMdMusicalNote/></div>
            </div>
            <div className='song-secondary__title'>
                {song.name}
            </div>
        </div>
    )
}

export default SongSecondary;