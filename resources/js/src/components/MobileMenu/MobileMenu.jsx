import React from 'react';
import NavMenu from '../NavMenu/NavMenu';

import './MobileMenu.scss';

const MobileMenu = () => {
    return (
        <div className='mobile-menu'>
            <NavMenu withIcons={true} />
        </div>
    )
}

export default MobileMenu;