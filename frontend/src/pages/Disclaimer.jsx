import React from 'react';

const textualStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px',
    background: '#18181b',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    lineHeight: '1.8',
    color: '#a1a1aa'
};

const Disclaimer = () => {
    return (
        <div style={textualStyle}>
            <h2 style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)',paddingBottom: '15px', marginBottom: '20px', color: '#fff' }}>Legal & Site Disclaimer</h2>
            <p style={{ marginBottom: '20px' }}>
                This is a simple disclaimer page. Please read the terms and conditions carefully.
            </p>

            <h4 style={{ marginTop: '25px', marginBottom: '10px', color: '#f97316' }}>Accuracy of Information</h4>
            <p style={{ marginBottom: '15px' }}>
                The information provided on this site is for general informational purposes only. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the information.
            </p>

            <p style={{ marginTop: '25px', fontStyle: 'italic', fontSize: '0.9rem' }}>
                By interacting you accept your interactions </p>
        </div>
    );
};

export default Disclaimer;