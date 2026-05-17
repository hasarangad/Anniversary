import React, { useState, useEffect } from 'react';

function FloatingHearts() {
    const [hearts, setHearts] = useState([]);
    const heartSymbols = ['❤️', '💖', '💕', '💗', '💓'];

    useEffect(() => {
        const interval = setInterval(() => {
            const newHeart = {
                id: Math.random().toString(36).substr(2, 9),
                symbol: heartSymbols[Math.floor(Math.random() * heartSymbols.length)],
                left: Math.random() * 100,
                duration: Math.random() * 15 + 10,
                size: Math.random() * 1.5 + 0.5
            };

            setHearts(prevHearts => [...prevHearts, newHeart]);

            // Remove heart after it finishes animating
            setTimeout(() => {
                setHearts(prevHearts => prevHearts.filter(h => h.id !== newHeart.id));
            }, newHeart.duration * 1000);

        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="heart-container">
            {hearts.map(heart => (
                <div 
                    key={heart.id} 
                    className="floating-heart"
                    style={{
                        left: `${heart.left}vw`,
                        animationDuration: `${heart.duration}s`,
                        fontSize: `${heart.size}rem`
                    }}
                >
                    {heart.symbol}
                </div>
            ))}
        </div>
    );
}

export default FloatingHearts;
