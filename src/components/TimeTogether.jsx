import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

function TimeTogether() {
    // Their relationship started 1 year before July 2, 2026 -> July 2, 2025
    const startDate = new Date('July 2, 2025 00:00:00').getTime();
    const [timeTogether, setTimeTogether] = useState({
        days: '00', hours: '00', minutes: '00', seconds: '00'
    });

    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

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
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);

                    // Fire Confetti!
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

                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const formatTime = (time) => time < 10 ? `0${time}` : time;

    return (
        <section
            id="countdown-section"
            className="countdown-section"
            ref={sectionRef}
        >
            <div className={`content-wrapper reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}>
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
