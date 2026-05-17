import React, { useEffect, useRef, useState } from 'react';

function LoveLetter() {
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
        <section className="love-letter-section" ref={sectionRef}>
            <div className={`letter-paper reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}>
                <h2 className="cursive-title">Happy Anniversary, My Dearest Boo,</h2>
                <p>I wanted to make something special just for you to celebrate our first anniversary together.</p>
                <p>Being with you has been the greatest adventure of my life. Even when you're busy with medical school, studying late into the night, just knowing you are mine makes me the happiest person alive.</p>
                <p>I promise to always be here to support you, to bring you coffee during your long study sessions, and to be your biggest cheerleader. You take care of others, so let me take care of you.</p>
                <p>Thank you for the most amazing year. I can't wait for all the years that come after it.</p>
                <p className="signature">Forever yours,<br/>❤️</p>
            </div>
        </section>
    );
}

export default LoveLetter;
