import React, { useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import usePlayer from '../../hooks/usePlayer';
import Loader from '../Loader/Loader';
import cn from 'classnames';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AiFillPlayCircle } from 'react-icons/ai';

import './Slider.scss';

const Slider = ({ items, title, type }) => {
    const sliderScrollContent = useRef()
    const { setAudio } = usePlayer()

    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            const itemWidth = defineItemWidth()

            switch (eventData.dir) {
                case 'Left': scrollSlider(itemWidth)
                    break
                case 'Right': scrollSlider(-itemWidth)
                    break
            }
        }
    })

    const defineItemWidth = () => {
        if (sliderScrollContent.current) {
            const children = sliderScrollContent.current.children
            return children[0].clientWidth
        }
    }

    const refPassthrough = (el) => {
        // call useSwipeable ref prop with el
        handlers.ref(el)

        // set myRef el so you can access it yourself
        sliderScrollContent.current = el
    }

    const scrollSlider = (scroll) => {
        const container = sliderScrollContent.current
        const containerGap = 15
        const amount = scroll > 0 ? scroll + containerGap : scroll - containerGap
    
        if (container) {
            const startingScroll = container.scrollLeft
            const targetScroll = startingScroll + amount
            const duration = 200
        
            const startTime = 'now' in window.performance ? performance.now() : new Date().getTime()
        
            const animateScroll = (timestamp) => {
                const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime()
                const progress = Math.min((currentTime - startTime) / duration, 1);
                const easeInOutCubic = (progress) => progress < 0.5 ? 4 * progress ** 3 : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1
        
                const newScroll = startingScroll + (targetScroll - startingScroll) * easeInOutCubic(progress)
                container.scrollLeft = newScroll
        
                if (progress < 1) {
                    requestAnimationFrame(animateScroll)
                }
            }
        
            requestAnimationFrame(animateScroll)
        }
    }

    return (
        <div className='slider'>
            <div className='slider__header'>
                <h1>{title && title}</h1>
                <div className='slider__tools'>
                    <div className='box-icon box-icon_anim' onClick={ () => scrollSlider(-defineItemWidth()) }><FaArrowLeft/></div>
                    <div className='box-icon box-icon_anim' onClick={ () => scrollSlider(defineItemWidth()) }><FaArrowRight/></div>
                </div>
            </div>
            {!items && <div className='center'><Loader/></div>}
            <div className='slider__content' {...handlers} ref={refPassthrough}>
                {items && items.map(item => (
                    <div className={cn('slider__item', { 
                            'song': type === 'song', 
                            'playlist': type === 'playlist' 
                        })} 
                        key={item.id} 
                        onClick={ () => type === 'song' && setAudio(item)}
                    >
                        <div className='box-icon'><AiFillPlayCircle/></div>
                        <div className='slider__name'>{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Slider;