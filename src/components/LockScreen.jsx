import React, { useState } from 'react';

function LockScreen({ onUnlock }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password === 'Richmond12') {
            // Admin override
            onUnlock('main');
        } else if (password === 'Boo@2026') {
            const targetDate = new Date('July 2, 2026 00:00:00').getTime();
            const now = new Date().getTime();
            
            if (now >= targetDate) {
                onUnlock('main');
            } else {
                onUnlock('countdown');
            }
        } else {
            setError("Incorrect password, try again!");
            setTimeout(() => setError(""), 2000);
        }
    };

    return (
        <div className="lock-screen">
            <div className="lock-panel glass-panel">
                <i className="fas fa-lock lock-icon"></i>
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
