import React, { useEffect, useState, useRef } from 'react';

const letterText = "I wanted to make something special just for you to celebrate our first anniversary together.\n\nBeing with you has been the greatest adventure of my life. Even when we're just relaxing or doing absolutely nothing together, just knowing you are mine makes me the happiest person alive.\n\nI promise to always be here to support you, to bring you your favorite treats, and to be your biggest cheerleader. You make every single day brighter, so let me spend the rest of my days making you smile.\n\nThank you for the most amazing year. I can't wait for all the years that come after it.";

function LoveLetter({ viewMode }) {
    const [typedText, setTypedText] = useState(viewMode === 'website' ? letterText : "");
    const [isTypingComplete, setIsTypingComplete] = useState(viewMode === 'website');
    const bottomRef = useRef(null);

    useEffect(() => {
        if (viewMode === 'website') return;
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView();
        }
    }, [typedText, viewMode]);

    useEffect(() => {
        if (viewMode === 'website') return;
        let currentIdx = 0;
        const interval = setInterval(() => {
            if (currentIdx < letterText.length) {
                currentIdx++;
                setTypedText(letterText.slice(0, currentIdx));
            } else {
                clearInterval(interval);
                setIsTypingComplete(true);
            }
        }, 50); // 50ms per character

        return () => clearInterval(interval);
    }, []);

    return (
        <section className={`love-letter-section ${viewMode !== 'website' ? 'fade-in' : ''}`}>
            <div className={`letter-paper ${viewMode !== 'website' ? 'is-visible' : 'reveal-on-scroll'}`}>
                <h2 className="cursive-title">Happy Anniversary, My Dearest Boo,</h2>
                <div style={{ whiteSpace: 'pre-wrap', minHeight: '250px', marginBottom: '2rem', lineHeight: '1.6' }}>
                    {typedText}
                </div>
                {isTypingComplete && (
                    <p className="signature fade-in">Forever yours,<br/>❤️</p>
                )}
                <div ref={bottomRef} />
            </div>
        </section>
    );
}

export default LoveLetter;
