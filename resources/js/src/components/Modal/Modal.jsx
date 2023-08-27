import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSwipeable } from 'react-swipeable';

import './Modal.scss';

const Modal = ({ active, setActive, children }) => {
    const modalContent = useRef(null)
    const [startY, setStartY] = useState(0)
    const [contentPosition, setContentPosition] = useState(0)

    useEffect(() => {
        // Function for mobile keyboard in mobile devices
        window.addEventListener('resize', mobileKeyboard)
        
        // Disabling scroll while modal window is active
        active && (document.body.style.overflowY = 'hidden')
        !active && (document.body.style.overflowY = '')

        // Focus first input in modal window
        const inputElement = document.querySelectorAll('.modal input, textarea')
        inputElement[0]?.focus()
    }, [active])

    const handlers = useSwipeable({
        onSwipedDown: (eventData) => {
            // Hide modal window after swiped down
            setActive(false)
        }
    })

    const handleTouchStart = (e) => {
        e.stopPropagation()

        const touch = e.touches[0]
        setStartY(touch.clientY)
    }

    const handleTouchEnd = (e) => {
        e.stopPropagation()

        if (contentPosition > 10) {
            modalContent.current.style.transform = `translateY(100%)`
            setActive(false)
        }
    }

    const handleTouchMove = (e) => {
        e.stopPropagation()
        
        const modalContentHeight = modalContent.current.clientHeight

        const touch = e.touches[0]
        const offsetY = touch.clientY - startY
        
        if ((modalContentHeight - offsetY) > modalContentHeight) {
            return 
        }

        setContentPosition(offsetY)
        modalContent.current.style.transform = `translateY(${offsetY}px)`
    }

    const mobileKeyboard = () => {
        const windowHeight = window.innerHeight
        const keyboardHeight = document.documentElement.clientHeight - windowHeight
        
        if (modalContent && modalContent.current) {
            modalContent.current.style.marginBottom = `${keyboardHeight}px`
        }
    }

    return (<>
            <CSSTransition in={active} timeout={500} classNames='appearance' unmountOnExit>
                <div className='modal' onClick={ () => setActive(false) } {...handlers}>
                    <div className='modal__block' 
                        ref={modalContent}
                        onClick={ (e) => e.stopPropagation() }  
                        onTouchStart={ (e) => handleTouchStart(e) } 
                        onTouchEnd={ (e) => handleTouchEnd(e) } 
                        onTouchMove={ (e) => handleTouchMove(e) }
                    >
                        <div className='modal__top'></div>
                        {children}
                    </div>
                </div>
            </CSSTransition>
    </>)
}

export default Modal;