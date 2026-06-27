import React, { useEffect, useState } from 'react';

function Reasons({ onComplete }) {
    const [visibleBoxes, setVisibleBoxes] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleBoxes(prev => {
                if (prev >= 3) {
                    clearInterval(interval);
                    setIsFadingOut(true);
                    setTimeout(() => {
                        if (onComplete) onComplete();
                    }, 1000);
                    return prev;
                }
                return prev + 1;
            });
        }, 8000);

        return () => clearInterval(interval);
    }, [onComplete]);

    const reasons = [
        { icon: "fas fa-star", title: "Your Beautiful Soul", text: "I love how kind and gentle you are with everyone. You have a heart of gold that shines so brightly, making my world a better place every single day." },
        { icon: "fas fa-smile-beam", title: "Your Sweet Smile", text: "It's literally my favorite sight in the world. No matter how tough a day I've had, seeing your adorable smile completely melts my heart." },
        { icon: "fas fa-cat", title: "Your Cute Energy", text: "I absolutely adore your playful and silly side. The way you laugh, the cute little things you do... everything about you is just perfect to me." },
        { icon: "fas fa-heart", title: "My Safe Place", text: "You make my heart skip a beat, but you also bring me so much peace. Being cuddled up with you just feels like home." }
    ];

    return (
        <section className={`reasons-section fade-in ${isFadingOut ? 'fade-out' : ''}`}>
            <div className="is-visible" style={{width: '100%'}}>
                <h2 className="section-title">A Prescription for Love</h2>
                <p className="section-subtitle">Dosage: Infinite, Frequency: Every single day</p>
                
                <div className="card-container">
                    {reasons.map((r, i) => (
                        visibleBoxes === i && (
                            <div 
                                key={i} 
                                className="reason-card fade-in" 
                            >
                                <div className="card-icon"><i className={r.icon}></i></div>
                                <h3>{r.title}</h3>
                                <p>{r.text}</p>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Reasons;
