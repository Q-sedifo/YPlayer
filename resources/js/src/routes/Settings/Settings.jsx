import React from 'react';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import HeaderBase from '../../components/Headers/HeaderBase';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import cn from 'classnames';

import  { RxExit } from 'react-icons/rx';

import './Settings.scss';

const Settings = () => {
    const { auth, logout } = useAuth()
    const { lightTheme, setThemeLight, setThemeDark, setThemeColor, currentThemeColor, animatedBackground, toggleAnimatedBackground } = useTheme()

    let searchDelay
    const chooseColor = (e) => {
        clearTimeout(searchDelay)
        searchDelay = setTimeout(() => {
            setThemeColor(e.target.value)
        }, 500)
    }
    
    return (
        <AuthMiddleware>
            <HeaderBase/>
            <div className='settings container'>
                <div className='block auth-info'>
                    <div className='block__header'><h1>Інформація про користувача</h1></div>
                    {auth && (
                        <div className='block__content'>
                            <div>Нікнейм: {auth.nickname}</div>
                            <div>Акаунт створено: {auth.created_at}</div>
                            <button className='auth-info__logout-btn btn' onClick={ () => logout() }>
                                Вийти<div className='box-icon'><RxExit/></div>
                            </button>
                        </div>
                    )}
                </div>
                <div className='block color-settings'>
                    <div className='block__header'><h1>Колір теми</h1></div>
                    <div className='block__content'>
                        <label className='color-settings__panel-color' htmlFor='color-settings__input'></label>
                        <input id='color-settings__input' type='color' defaultValue={currentThemeColor.hex} onChange={ (e) => chooseColor(e) } />
                    </div>
                </div>
                <div className='block theme-settings'>
                    <div className='block__header'><h1>Тема</h1></div>
                    <div className='block__content'>
                        <div className={cn('theme-settings__theme theme-settings__theme_white', {
                            'theme-settings__theme_active': lightTheme
                        })}
                        onClick={ () => setThemeLight() }
                        >
                        </div>
                        <div className={cn('theme-settings__theme theme-settings__theme_dark', {
                            'theme-settings__theme_active': !lightTheme
                        })}
                        onClick={ () => setThemeDark() }
                        >
                        </div>
                    </div>
                </div>
                <div className='block animated-background'>
                    <div className='block__header'><h1>Анімований фон</h1></div>
                    <div className='block__content'>
                        <div className={cn('switch', { 'switch_active': animatedBackground })} onClick={ () => toggleAnimatedBackground() }></div>
                    </div>
                </div>
            </div>
        </AuthMiddleware>
    )
}

export default Settings;