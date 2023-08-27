import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import PlayerProvider from './context/PlayerProvider';
import ThemeProvider from './context/ThemeProvider';
import useAuth from './hooks/useAuth';
import Footer from './components/Footer/Footer';

// Css
import './App.scss';

// Routes
import Welcome from './routes/Welcome/Welcome';
import Library from './routes/Library/Library';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import NotFound from './routes/NotFound/NotFound';
import Playlists from './routes/Playlists/Playlists';
import Playlist from './routes/Playlist/Playlist';
import Settings from './routes/Settings/Settings';
import Songs from './routes/Songs/Songs';

const App = () => {
    const { auth } = useAuth()

    return (
        <>
            <Routes>
                <Route exact path='/' element={<Library/>} />
                <Route exact path='/welcome' element={<Welcome/>} />
                <Route exact path='/login' element={<Login/>} />
                <Route exact path='/register' element={<Register/>} />
                <Route exact path='/playlists' element={<Playlists/>} />
                <Route exact path='/playlists/:playlistId' element={<Playlist/>} />
                <Route exact path='/settings' element={<Settings/>} />
                <Route exact path='/songs' element={<Songs/>} />
                <Route path='*' element={<NotFound/>} /> 
            </Routes>

            {auth && <Footer/>}
        </>
    )
}

export default App;

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById('app'))

    Index.render(
        // <React.StrictMode>
            <AuthProvider>
                <ThemeProvider>
                    <PlayerProvider>
                        <BrowserRouter>
                            <App/>
                        </BrowserRouter>
                    </PlayerProvider>
                </ThemeProvider>
            </AuthProvider>
        // </React.StrictMode>
    )
}

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw-handmade.js')
            .then(registration => {
                console.log('ServiceWorkerRegistered')
            })
    })
}

