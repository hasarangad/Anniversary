import React, { useEffect, useRef, useState } from 'react';

function Hero() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true); // Hero should be visible immediately on load
    }, []);

    return (
        <section className="hero" id="home" ref={sectionRef}>
            <div className={`glass-panel reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}>
                <h1 className="cursive-title">To My Beautiful Boo</h1>
                <p className="subtitle">My favorite person, my future doctor, my everything.</p>
                
                <div className="heartbeat-container">
                    <svg className="heartbeat-line" viewBox="0 0 500 100">
                        <polyline points="0,50 150,50 170,20 190,80 210,10 230,90 250,50 450,50" />
                        <path className="heart-icon" d="M 450 50 C 450 40, 460 30, 470 40 C 480 30, 490 40, 490 50 C 490 65, 470 75, 470 90 C 470 75, 450 65, 450 50 Z" />
                    </svg>
                </div>
                
                <a href="#countdown-section" className="scroll-btn">
                    <i className="fas fa-chevron-down"></i>
                </a>
            </div>
        </section>
    );
}

export default Hero;
