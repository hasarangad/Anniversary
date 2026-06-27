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
                <p className="subtitle">My favorite person, my best friend, my everything.</p>
                
                <div className="cute-hero-graphics">
                    <div className="bouncy-heart">
                        <i className="fas fa-heart"></i>
                    </div>
                    <div className="sparkles">
                        <i className="fas fa-star sparkle-1"></i>
                        <i className="fas fa-star sparkle-2"></i>
                        <i className="fas fa-star sparkle-3"></i>
                    </div>
                </div>
                
                <a href="#countdown-section" className="scroll-btn">
                    <i className="fas fa-chevron-down"></i>
                </a>
            </div>
        </section>
    );
}

export default Hero;
