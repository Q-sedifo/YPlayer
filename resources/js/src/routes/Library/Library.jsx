import React from 'react';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import HeaderBase from '../../components/Headers/HeaderBase';
import RecentlyListened from '../../components/RecentlyListened/RecentlyListened';
import Popular from '../../components/Popular/Popular';
import RandomSongs from '../../components/RandomSongs/RandomSongs';

import './Library.scss';

const Library = () => {
    return (
        <AuthMiddleware>
            <HeaderBase/>
            <div className='library container'>
                <RecentlyListened/>
                <RandomSongs/>
                <Popular/>
            </div>
        </AuthMiddleware>
    )
}

export default Library;