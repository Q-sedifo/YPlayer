import React from 'react';

import './Loader.scss';

const Loader = ({ line }) => {
    return (
        <>
            {!line && (
                <div className='lds-ring loader'>
                    <div></div><div></div><div></div><div></div>
                </div>
            )}
            {line && <div className='loader'></div>}
        </>
    )
}

export default Loader;