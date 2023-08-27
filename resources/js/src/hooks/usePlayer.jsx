import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerProvider';

const usePlayer = () => {
    const value = useContext(PlayerContext)
    
    return value
}

export default usePlayer;