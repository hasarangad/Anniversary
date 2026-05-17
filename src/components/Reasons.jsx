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
                        <div className="card-icon"><i className="fas fa-stethoscope"></i></div>
                        <h3>Your Passion</h3>
                        <p>I love watching you study and work so hard. You're going to be the most amazing doctor, Boo. Your dedication inspires me every day.</p>
                    </div>
                    <div className="reason-card" style={{ transitionDelay: '0.3s' }}>
                        <div className="card-icon"><i className="fas fa-smile-beam"></i></div>
                        <h3>Your Smile</h3>
                        <p>It's literally my favorite sight in the world. No matter how tough a day I've had, seeing you smile completely cures it.</p>
                    </div>
                    <div className="reason-card" style={{ transitionDelay: '0.5s' }}>
                        <div className="card-icon"><i className="fas fa-brain"></i></div>
                        <h3>Your Brilliant Mind</h3>
                        <p>Not only are you beautiful, but you are so incredibly smart. I love our conversations and how you see the world.</p>
                    </div>
                    <div className="reason-card" style={{ transitionDelay: '0.7s' }}>
                        <div className="card-icon"><i className="fas fa-heartbeat"></i></div>
                        <h3>My Safe Place</h3>
                        <p>You make my heart skip a beat, but you also bring me so much peace. Being with you just feels like home.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reasons;
