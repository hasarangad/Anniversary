import React, { useEffect, useState } from 'react';

function Hero({ onComplete, viewMode }) {
    const [phase, setPhase] = useState(viewMode === 'website' ? 1 : 0); // 0: hey boo, 1: to my beautiful boo, 2: fading out
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        if (viewMode === 'website') return;
        const timer1 = setTimeout(() => {
            setPhase(1);
        }, 5000);

        const timer2 = setTimeout(() => {
            setIsFadingOut(true);
            setPhase(2);
        }, 10000);

        const timer3 = setTimeout(() => {
            if (onComplete) onComplete();
        }, 11000); // 1s for fade out

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete]);

    return (
        <section className={`hero ${viewMode !== 'website' ? 'fade-in' : ''} ${isFadingOut ? 'fade-out' : ''}`}>
            <div className={`glass-panel ${viewMode !== 'website' ? 'is-visible' : 'reveal-on-scroll'}`}>
                {phase === 0 ? (
                    <h1 className="cursive-title fade-in" key="phase0">Hey Boo, the waiting is over!</h1>
                ) : (
                    <div className="fade-in" key="phase1">
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
                    </div>
                )}
            </div>
        </section>
    );
}

export default Hero;
