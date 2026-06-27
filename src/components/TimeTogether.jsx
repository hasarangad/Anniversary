import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

function TimeTogether({ onComplete, viewMode }) {
    const startDate = new Date('July 2, 2025 00:00:00').getTime();
    const [timeTogether, setTimeTogether] = useState({
        days: '00', hours: '00', minutes: '00', seconds: '00'
    });
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = now - startDate;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeTogether({
                    days: formatTime(days),
                    hours: formatTime(hours),
                    minutes: formatTime(minutes),
                    seconds: formatTime(seconds)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startDate]);

    useEffect(() => {
        let confettiFired = false;
        const fireConfetti = () => {
            if (confettiFired) return;
            confettiFired = true;
            var duration = 3 * 1000;
            var end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ff8fb3', '#ffc2d4', '#ffffff']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ff8fb3', '#ffc2d4', '#ffffff']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        };

        if (viewMode === 'website') {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    fireConfetti();
                    observer.disconnect();
                }
            }, { threshold: 0.5 });
            
            const el = document.getElementById('countdown-section');
            if (el) observer.observe(el);
            
            return () => observer.disconnect();
        } else {
            fireConfetti();
        }
    }, [viewMode]);

    useEffect(() => {
        if (viewMode === 'website') return;

        const timerOut = setTimeout(() => {
            setIsFadingOut(true);
        }, 9000);

        const timerComplete = setTimeout(() => {
            if (onComplete) onComplete();
        }, 10000);

        return () => {
            clearTimeout(timerOut);
            clearTimeout(timerComplete);
        };
    }, [onComplete]);

    const formatTime = (time) => time < 10 ? `0${time}` : time;

    return (
        <section
            id="countdown-section"
            className={`countdown-section ${viewMode !== 'website' ? 'fade-in zoom-in-slow' : ''} ${isFadingOut ? 'fade-out' : ''}`}
        >
            <div className={`content-wrapper ${viewMode !== 'website' ? 'is-visible' : 'reveal-on-scroll'}`}>
                <h2 className="section-title">Happy 1 Year Anniversary, Boo! ❤️</h2>
                <p className="anniversary-date">Time We've Been In Love</p>

                <div className="countdown-timer">
                    <div className="time-box">
                        <span>{timeTogether.days}</span>
                        <span className="label">Days</span>
                    </div>
                    <div className="time-box">
                        <span>{timeTogether.hours}</span>
                        <span className="label">Hours</span>
                    </div>
                    <div className="time-box">
                        <span>{timeTogether.minutes}</span>
                        <span className="label">Minutes</span>
                    </div>
                    <div className="time-box">
                        <span>{timeTogether.seconds}</span>
                        <span className="label">Seconds</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TimeTogether;
