import React, { useEffect, useRef, useState } from 'react';

function Reasons() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="reasons-section" ref={sectionRef}>
            <div className={`reveal-on-scroll ${isVisible ? 'is-visible' : ''}`} style={{width: '100%'}}>
                <h2 className="section-title">A Prescription for Love</h2>
                <p className="section-subtitle">Dosage: Infinite, Frequency: Every single day</p>
                
                <div className="card-container">
                    <div className="reason-card" style={{ transitionDelay: '0.1s' }}>
                        <div className="card-icon"><i className="fas fa-star"></i></div>
                        <h3>Your Beautiful Soul</h3>
                        <p>I love how kind and gentle you are with everyone. You have a heart of gold that shines so brightly, making my world a better place every single day.</p>
                    </div>
                    <div className="reason-card" style={{ transitionDelay: '0.3s' }}>
                        <div className="card-icon"><i className="fas fa-smile-beam"></i></div>
                        <h3>Your Sweet Smile</h3>
                        <p>It's literally my favorite sight in the world. No matter how tough a day I've had, seeing your adorable smile completely melts my heart.</p>
                    </div>
                    <div className="reason-card" style={{ transitionDelay: '0.5s' }}>
                        <div className="card-icon"><i className="fas fa-cat"></i></div>
                        <h3>Your Cute Energy</h3>
                        <p>I absolutely adore your playful and silly side. The way you laugh, the cute little things you do... everything about you is just perfect to me.</p>
                    </div>
                    <div className="reason-card" style={{ transitionDelay: '0.7s' }}>
                        <div className="card-icon"><i className="fas fa-heart"></i></div>
                        <h3>My Safe Place</h3>
                        <p>You make my heart skip a beat, but you also bring me so much peace. Being cuddled up with you just feels like home.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reasons;
