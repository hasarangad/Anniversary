import React, { useState } from 'react';

function LockScreen({ onUnlock }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [showAudioPrompt, setShowAudioPrompt] = useState(false);
    const [showViewPrompt, setShowViewPrompt] = useState(false);
    const [audioChoice, setAudioChoice] = useState(false);
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

    const handleAudioChoice = (choice) => {
        setAudioChoice(choice);
        setShowAudioPrompt(false);
        setShowViewPrompt(true);
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
                        <button className="lock-btn" onClick={() => handleAudioChoice(true)}>Yes</button>
                        <button className="lock-btn" style={{ background: 'var(--glass-border)' }} onClick={() => handleAudioChoice(false)}>No</button>
                    </div>
                </div>
            </div>
        );
    }

    if (showViewPrompt) {
        return (
            <div className="lock-screen">
                <div className="lock-panel glass-panel" style={{ maxWidth: '600px' }}>
                    <i className="fas fa-eye lock-icon"></i>
                    <h2 className="cursive-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Choose Your Experience</h2>
                    <p className="subtitle" style={{ marginBottom: '2rem', color: 'var(--text-main)' }}>
                        How would you like to view your anniversary surprise?
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                        <button className="lock-btn" onClick={() => onUnlock(nextState, audioChoice, 'presentation')}>
                            <strong>Presentation View</strong><br/>
                            <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>An automated, cinematic slideshow that plays like a movie.</span>
                        </button>
                        <button className="lock-btn" style={{ background: 'var(--glass-border)' }} onClick={() => onUnlock(nextState, audioChoice, 'website')}>
                            <strong>Website View</strong><br/>
                            <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>A traditional, scrollable webpage to explore at your own pace.</span>
                        </button>
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
