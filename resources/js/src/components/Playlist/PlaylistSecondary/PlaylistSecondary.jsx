import React from 'react';
import cn from 'classnames';
import MusicBars from '../../MusicBars/MusicBars';
import usePlayer from '../../../hooks/usePlayer';
import { Link } from 'react-router-dom';

import './PlaylistSecondary.scss';

const PlaylistSecondary = (props) => {
    const { currentAudio } = usePlayer()
    const { playlist } = props

    return (<>
        {playlist && (
            <Link to={`/playlists/${playlist.id}`}>
                <div 
                    className={cn('playlist-secondary', {
                        'playlist-secondary_active': currentAudio && currentAudio.playlists && currentAudio.playlists.some(obj => obj.id === playlist.id)
                    })} 
                >
                    <div className='playlist-secondary__preview' style={{ backgroundImage: `url(${playlist.preview})` }}>
                        <MusicBars/>
                    </div>
                    <div className='playlist-secondary__title'>
                        {playlist.name && playlist.name}
                    </div>
                </div>
            </Link>
        )}
    </>)
}

export default PlaylistSecondary;