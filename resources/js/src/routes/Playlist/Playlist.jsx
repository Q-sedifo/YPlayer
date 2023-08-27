import React, { useState, useEffect } from 'react';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import useAuth from '../../hooks/useAuth';
import usePlayer from '../../hooks/usePlayer';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import HeaderPlaylist from '../../components/Headers/HeaderPlaylist';
import SongPrimary from '../../components/Song/SongPrimary/SongPrimary';
import AddSongToPlaylistModal from '../../components/Modals/AddSongToPlaylistModal/AddSongToPlaylistModal';
import RenamePlaylistModal from '../../components/Modals/RenamePlaylistModal/RenamePlaylistModal';
import DeletePlaylistModal from '../../components/Modals/DeletePlaylistModal/DeletePlaylistModal';
import axios from 'axios';
import NET from '../../network';

import './Playlist.scss';

const Playlist = () => {
    const { auth, authRequest } = useAuth()
    const { playlistId } = useParams()
    const { setAudios } = usePlayer()
    const [playlist, setPlaylist] = useState(null)
    const [loading, setLoading] = useState(true)
    const [addSongToPlaylistModal, setAddSongToPlaylistModal] = useState(false)
    const [renamePlaylistModal, setRenamePlaylistModal] = useState(false)
    const [deletePlaylistModal, setDeletePlaylistModal] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getPlaylist()
    }, [auth])

    const getPlaylist = () => {
        authRequest(() => {
            axios.get(`${NET.APP_URL}/playlists/${playlistId}`)
                .then(({data}) => {
                    setPlaylist(data)
                    setAudios(data.songs)
                    setLoading(false)
                })
                .catch(() => navigate('/'))
        })
    }
    
    return (
        <AuthMiddleware>
            <HeaderPlaylist 
                playlist={playlist} 
                getPlaylist={getPlaylist} 
                setAddSongToPlaylistModal={setAddSongToPlaylistModal} 
                setRenamePlaylistModal={setRenamePlaylistModal}
                setDeletePlaylistModal={setDeletePlaylistModal}
            />
            <div className='playlist'>
                <div 
                    className='playlist__preview' 
                    style={playlist && { backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, var(--black) 105%), url(${playlist.preview})` }}
                >
                    {loading && <div className='center'><Loader/></div>}
                    {playlist && (
                        <div className='playlist__info'>
                            <div className='container'>
                                <div className='playlist__title'>{playlist.name}</div>
                                <div className='playlist__tracks-count'>Треків {playlist.songs.length}</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className='container'>
                    {playlist && playlist.songs.length === 0 && (
                        <div className='block'>
                            <div className='block__header'></div>
                            <div className='block__message'>У цьому плейлисті поки немає композицій</div>
                        </div>
                    )}
                    <div className='playlist__songs-list'>
                        {playlist && playlist.songs.map(song => (
                            <SongPrimary key={song.id} song={song} playlist={playlist} getPlaylist={getPlaylist} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal from for adding song to playlist */}
            <AddSongToPlaylistModal active={addSongToPlaylistModal} setActive={setAddSongToPlaylistModal} playlist={playlist} getPlaylist={getPlaylist}/>
            <RenamePlaylistModal active={renamePlaylistModal} setActive={setRenamePlaylistModal} playlist={playlist} getPlaylist={getPlaylist}/>
            <DeletePlaylistModal active={deletePlaylistModal} setActive={setDeletePlaylistModal} playlist={playlist}/>
        </AuthMiddleware>
    )
}

export default Playlist;