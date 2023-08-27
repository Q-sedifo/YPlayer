import React, { useState, useMemo } from 'react';
import { hexToRgb } from '../utilites/Color';

export const ThemeContext = React.createContext()

const ThemeProvider = ({ children }) => {
    const [lightTheme, setLightTheme] = useState(false)
    const [animatedBackground, setAnimatedBackground] = useState(true)
    const app = document.documentElement
    const appBackground = document.querySelector('#app')
    const [currentThemeColor, setCurrentThemeColor] = useState({
        rgb: 'rgb(48, 113, 242)',
        hex: '#3071f2'
    })

    React.useEffect(() => {
        const theme = localStorage.getItem('light-theme')
        const backgroundAnimationDisabled = localStorage.getItem('animated-background-disabled')
        const themeColor = JSON.parse(localStorage.getItem('theme-color'))
       
        if (theme) {
            localStorage.setItem('light-theme', true)
            app.setAttribute('data-theme', 'light')
            setLightTheme(true)
        }
       
        if (backgroundAnimationDisabled) {
            setAnimatedBackground(false)
            appBackground.style.background = `var(--primary)`
        }

        if (themeColor) {
            setCurrentThemeColor(themeColor)
            app.style.setProperty('--custom', themeColor.rgb)
        }

    }, [])

    const setThemeLight = () => {
        setLightTheme(true)
        localStorage.setItem('light-theme', true)
        app.setAttribute('data-theme', 'light')
    }

    const setThemeDark = () => {
        setLightTheme(false)
        localStorage.removeItem('light-theme')
        app.removeAttribute('data-theme')
    }

    const setThemeColor = (color) => {
        const colorObject = {
            rgb: hexToRgb(color),
            hex: color
        }

        setCurrentThemeColor(colorObject)

        localStorage.setItem('theme-color', JSON.stringify(colorObject))
        app.style.setProperty('--custom', colorObject.rgb)
    }

    const toggleAnimatedBackground = () => {
        // console.log(animatedBackground)
        // return 

        if (!animatedBackground) {
            localStorage.removeItem('animated-background-disabled')
            setAnimatedBackground(true)
            return
        }

        localStorage.setItem('animated-background-disabled', true)
        appBackground.style.background = `var(--primary)`
        setAnimatedBackground(false)
    }

    const value = useMemo(() => ({ lightTheme, setThemeDark, setThemeLight, setThemeColor, currentThemeColor, animatedBackground, toggleAnimatedBackground }), [lightTheme, currentThemeColor, animatedBackground])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;



