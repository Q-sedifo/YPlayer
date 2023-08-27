import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider';

const useTheme = () => {
    const value = useContext(ThemeContext)
    
    return value
}

export default useTheme;