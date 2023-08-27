import React from 'react';
import usePlayer from '../../../hooks/usePlayer';
import cn from 'classnames';

import { RiRepeatLine } from 'react-icons/ri';
import { IoMdMusicalNote } from 'react-icons/io'; 
import { TbPlayerPlayFilled, TbPlayerPauseFilled, TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled } from 'react-icons/tb';

import './Player.scss';

const Player = () => {
    const { 
        currentAudio, currentAudioPlaying, 
        playSong, pauseSong, 
        audioRealTime, audioDuration, 
        repeatSong, setRepeatSong, setProgressBar,
        nextSong, previousSong
    } = usePlayer()

    return (<>
        {currentAudio && (
            <div className='player'>
                <div className='player__progress-bar' onClick={ e => setProgressBar(e) }><div className='player__progress-line'></div></div>
                <div className='player__left-side'>
                    <div className='box-icon' onClick={ () => previousSong() }><TbPlayerSkipBackFilled/></div>
                    {!currentAudioPlaying && (
                        <div className='box-icon' onClick={ () => playSong() }><TbPlayerPlayFilled/></div>
                    )}
                    {currentAudioPlaying && (
                        <div className='box-icon' onClick={ () => pauseSong() }><TbPlayerPauseFilled/></div>
                    )}
                    <div className='box-icon' onClick={ () => nextSong() }><TbPlayerSkipForwardFilled/></div>
                </div>
                <div className='player__center-side'>
                    <div className='player__song-preview'><div className='box-icon'><IoMdMusicalNote/></div></div>
                    <div className='player__song-name'>
                        <marquee>{currentAudio && currentAudio.name && currentAudio.name }</marquee>
                        <div className='player__time player__time_mobile'>
                            {audioRealTime && audioRealTime} / {audioDuration && audioDuration}
                        </div>
                    </div>
                </div>
                <div className='player__right-side'>
                    <div className='player__time'>{audioRealTime && audioRealTime} / {audioDuration && audioDuration}</div>
                    <div 
                        className={cn('player__repeat-btn', 'box-icon', {
                            'player__repeat-btn_active': repeatSong
                        })}
                        onClick={ () => setRepeatSong(!repeatSong) }
                    >
                        <RiRepeatLine/>
                    </div>
                </div>
            </div>
        )}
    </>)
}

export default Player;