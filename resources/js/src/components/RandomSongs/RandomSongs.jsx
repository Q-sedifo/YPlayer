import React, { useState, useEffect } from 'react';
import Slider from '../Slider/Slider';
import useAuth from '../../hooks/useAuth';
import NET from '../../network';
import axios from 'axios';

const RandomSongs = () => {
    const { auth, authRequest } = useAuth()
    const [songs, setSongs] = useState(null)

    useEffect(() => {
        getRandomSongs()
    }, [auth])

    const getRandomSongs = () => {
        authRequest(() => {
            axios.get(`${NET.APP_URL}/songs/random`)
                .then(({data}) => setSongs(data))
        })
    }

    return (
        <Slider type='song' items={songs} title='Вам сподобається'/>
    )
}

export default RandomSongs;
