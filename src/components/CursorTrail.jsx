import React, { useEffect, useState } from 'react';

function CursorTrail() {
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Only add a trail item every few pixels to avoid too many DOM nodes
            if (Math.random() > 0.8) {
                const newTrail = {
                    id: Math.random().toString(36).substr(2, 9),
                    x: e.clientX,
                    y: e.clientY
                };

                setTrails((prev) => [...prev, newTrail]);

                // Remove after animation (0.8s)
                setTimeout(() => {
                    setTrails((prev) => prev.filter(t => t.id !== newTrail.id));
                }, 800);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="cursor-trail-container">
            {trails.map(trail => (
                <div 
                    key={trail.id} 
                    className="trail-heart"
                    style={{ left: trail.x, top: trail.y }}
                >
                    💖
                </div>
            ))}
        </div>
    );
}

export default CursorTrail;
