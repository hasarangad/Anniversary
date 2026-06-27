import React, { useState, useEffect } from 'react';
import FloatingHearts from './FloatingHearts';

function WaitingPage() {
    const targetDate = new Date('July 2, 2026 00:00:00').getTime();
    const [timeLeft, setTimeLeft] = useState({
        days: '00', hours: '00', minutes: '00', seconds: '00'
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({
                    days: formatTime(days),
                    hours: formatTime(hours),
                    minutes: formatTime(minutes),
                    seconds: formatTime(seconds)
                });
            } else {
                // If they waited on this page until the exact moment, we should just reload the app
                window.location.reload();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const formatTime = (time) => time < 10 ? `0${time}` : time;

    return (
        <div className="waiting-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <FloatingHearts />
            
            <div className="glass-panel" style={{ zIndex: 10, textAlign: 'center' }}>
                <i className="fas fa-calendar-heart" style={{ fontSize: '4rem', color: 'var(--primary-color)', marginBottom: '1rem', animation: 'pulseHeart 2s infinite' }}></i>
                <h1 className="cursive-title">Patience, My Love</h1>
                <p className="subtitle">The surprise isn't ready just yet. It will unlock in:</p>
                
                <div className="countdown-timer" style={{ marginTop: '2rem' }}>
                    <div className="time-box">
                        <span>{timeLeft.days}</span>
                        <span className="label">Days</span>
                    </div>
                    <div className="time-box">
                        <span>{timeLeft.hours}</span>
                        <span className="label">Hours</span>
                    </div>
                    <div className="time-box">
                        <span>{timeLeft.minutes}</span>
                        <span className="label">Minutes</span>
                    </div>
                    <div className="time-box">
                        <span>{timeLeft.seconds}</span>
                        <span className="label">Seconds</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WaitingPage;
