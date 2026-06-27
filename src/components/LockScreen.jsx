import React, { useState } from 'react';

function LockScreen({ onUnlock }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [showAudioPrompt, setShowAudioPrompt] = useState(false);
    const [nextState, setNextState] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === 'Richmond12') {
            // Admin override
            setNextState('main');
            setShowAudioPrompt(true);
        } else if (password === 'Boo@2026') {
            const targetDate = new Date('July 2, 2026 00:00:00').getTime();
            const now = new Date().getTime();

            if (now >= targetDate) {
                setNextState('main');
            } else {
                setNextState('countdown');
            }
            setShowAudioPrompt(true);
        } else {
            setError("Incorrect password, try again!");
            setTimeout(() => setError(""), 2000);
        }
    };

    if (showAudioPrompt) {
        return (
            <div className="lock-screen">
                <div className="lock-panel glass-panel" style={{ maxWidth: '400px' }}>
                    <i className="fas fa-music lock-icon"></i>
                    <h2 className="cursive-title" style={{ fontSize: '2.5rem' }}>Music is Playing! 🎶</h2>
                    <p className="subtitle" style={{ marginBottom: '2rem', color: 'var(--text-main)' }}>
                        If you want to hear it, please increase your volume and tap 'Yes'. If not, tap 'No'.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
                        <button className="lock-btn" onClick={() => onUnlock(nextState, true)}>Yes</button>
                        <button className="lock-btn" style={{ background: 'var(--glass-border)' }} onClick={() => onUnlock(nextState, false)}>No</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="lock-screen">
            <div className="lock-panel glass-panel">
                <i className="fas fa-envelope-open-heart lock-icon"></i>
                <h2 className="cursive-title" style={{ fontSize: '3rem' }}>A Special Delivery</h2>
                <p className="subtitle" style={{ marginBottom: '2rem' }}>Please enter the secret password to unlock your surprise.</p>

                <form onSubmit={handleSubmit} className="lock-form">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password..."
                        className={`lock-input ${error === "Incorrect password, try again!" ? 'error' : ''}`}
                    />
                    <button type="submit" className="lock-btn">Unlock ❤️</button>
                </form>
                {error && <p className="error-text">{error}</p>}
            </div>
        </div>
    );
}

export default LockScreen;
