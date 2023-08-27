import React, { useState, useRef } from 'react';
import { formatTime } from '../utilites/Time';
import useAuth from '../hooks/useAuth';

import NET from '../network';
import axios from 'axios';

export const PlayerContext = React.createContext()

const PlayerProvider = ({ children }) => {
    const [currentAudio, setCurrentAudio] = useState(null)
    const [audios, setAudios] = useState(null)
    const [currentAudioPlaying, setCurrentAudioPlaying] = useState(false)
    const [repeatSong, setRepeatSong] = useState(false)
    const [audioRealTime, setAudioRealTime] = useState(formatTime(0))
    const [audioDuration, setAudioDuration] = useState(formatTime(0))
    const audioTag = useRef(null)

    const { authRequest } = useAuth()

    React.useEffect(() => {
        audioTag.current.addEventListener('timeupdate', updateProgressBar)
        audioTag.current.addEventListener('ended', () => {
            pauseSong()

            if (!repeatSong && audios && audios.length > 1) nextSong()
        })
    }, [currentAudio, repeatSong, audios])

    const setAudio = (music) => {
        setCurrentAudio(music)
        setCurrentAudioPlaying(true)
        setTimeout(playSong, 500)

        // ++ songListening
        music && music.id && incrementSongListening(music.id)
    }

    const playSong = () => {
        setAudioDuration(formatTime(audioTag.current.duration))
        audioTag.current.play()
        setCurrentAudioPlaying(true)
    }

    const pauseSong = () => {
        audioTag.current.pause()
        setCurrentAudioPlaying(false)
    }

    const nextSong = () => {
        if (!audios || audios.length < 1) return

        let nextSongIndex = audios.indexOf(currentAudio, 0)
        
        if (nextSongIndex + 1 == audios.length) {
            setAudio(audios[0])
            return
        }

        setAudio(audios[++nextSongIndex])
    }

    const previousSong = () => {
        if (!audios || audios.length < 1) return

        let previousSongIndex = audios.indexOf(currentAudio, 0)

        if (previousSongIndex - 1 == -1) {
            setAudio(audios[audios.length - 1])
            return
        }

        setAudio(audios[--previousSongIndex])
    }

    const updateProgressBar = () => {
        if (!audioTag) return
       
        const duration = audioTag.current.duration
        const currentTime = Math.round(audioTag.current.currentTime)
        const progressPercent = ( currentTime / duration ) * 100
        
        const progessBar = document.querySelector('.player__progress-line')
        progessBar && (progessBar.style.width = `${progressPercent}%`)

        const formattedCurrentTime = formatTime(currentTime)
        setAudioDuration(formatTime(duration))
        setAudioRealTime(formattedCurrentTime)
    }

    const setProgressBar = (e) => {
        const clickPoint = e.nativeEvent.offsetX
        const progressBar = e.target

        const progressPercent = ( clickPoint / progressBar.clientWidth ) * 100
        const duration = audioTag.current.duration

        audioTag.current.currentTime = Math.round(( progressPercent / 100 ) * duration)
    }

    const incrementSongListening = (songId) => {
        authRequest(() => {
            axios.post(`${NET.APP_URL}/songs/incrementsListening`, { songId })
        })
    }

    const value = { 
        currentAudio, setAudio,
        setAudios, 
        currentAudioPlaying,
        repeatSong, setRepeatSong,
        audioRealTime,
        playSong, pauseSong, 
        nextSong, previousSong,
        updateProgressBar, setProgressBar,
        audioDuration
    }

    return (
        <PlayerContext.Provider value={value}>
            <audio src={currentAudio && `${currentAudio.path}`} loop={repeatSong} ref={audioTag}></audio>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerProvider;
