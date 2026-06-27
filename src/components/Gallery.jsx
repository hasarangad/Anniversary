import React, { useState, useEffect } from 'react';

// Use Vite's glob import to automatically load all jpg images from the folder
const imageModules = import.meta.glob('../assets/images/*.jpg', { eager: true, import: 'default' });
const images = Object.values(imageModules);

function Gallery({ onComplete, viewMode }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const total = images.length;

    useEffect(() => {
        if (total === 0) {
            if (onComplete && viewMode !== 'website') onComplete();
            return;
        }

        if (viewMode === 'website') return;

        const timer = setTimeout(() => {
            if (currentIndex < total - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                setIsFadingOut(true);
                setTimeout(() => {
                    if (onComplete) onComplete();
                }, 1000);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [currentIndex, total, onComplete]);

    if (total === 0) {
        return null; // Don't render if no images
    }

    const getSlideStyle = (index) => {
        // Calculate the shortest distance accounting for wrap-around
        let distance = (index - currentIndex) % total;
        if (distance > Math.floor(total / 2)) distance -= total;
        if (distance < -Math.floor(total / 2)) distance += total;

        // Base styles for hidden items
        let style = {
            opacity: 0,
            transform: 'translateX(0px) scale(0.5)',
            zIndex: 0,
            pointerEvents: 'none'
        };

        if (distance === 0) {
            // Center active item
            style = {
                opacity: 1,
                transform: 'translateX(0) scale(1)',
                zIndex: 10,
                pointerEvents: 'auto',
                boxShadow: '0 15px 40px rgba(255, 75, 114, 0.4)'
            };
        } else if (distance === 1) {
            // Right item
            style = {
                opacity: 0.8,
                transform: 'translateX(65%) scale(0.8)',
                zIndex: 8,
                pointerEvents: 'auto',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            };
        } else if (distance === -1) {
            // Left item
            style = {
                opacity: 0.8,
                transform: 'translateX(-65%) scale(0.8)',
                zIndex: 8,
                pointerEvents: 'auto',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            };
        } else if (distance === 2) {
            // Far right item
            style = {
                opacity: 0.4,
                transform: 'translateX(110%) scale(0.6)',
                zIndex: 6,
                pointerEvents: 'auto',
                boxShadow: '0 5px 10px rgba(0,0,0,0.1)'
            };
        } else if (distance === -2) {
            // Far left item
            style = {
                opacity: 0.4,
                transform: 'translateX(-110%) scale(0.6)',
                zIndex: 6,
                pointerEvents: 'auto',
                boxShadow: '0 5px 10px rgba(0,0,0,0.1)'
            };
        }

        return style;
    };

    return (
        <section className={`gallery-section ${viewMode !== 'website' ? 'fade-in' : ''} ${viewMode !== 'website' && isFadingOut ? 'fade-out' : ''}`}>
            <div className={`${viewMode !== 'website' ? 'reveal-on-scroll is-visible' : 'reveal-on-scroll'}`} style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 className="section-title">Our Beautiful Memories</h2>
                <p className="section-subtitle">Every moment with you is a treasure.</p>

                <div className="carousel-container">
                    <div className="carousel-track">
                        {images.map((imgSrc, index) => (
                            <div
                                key={index}
                                className="carousel-slide"
                                style={getSlideStyle(index)}
                                onClick={() => setCurrentIndex(index)}
                            >
                                <img src={imgSrc} alt={`Memory ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Dots */}
                    <div className="gallery-dots">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Gallery;
