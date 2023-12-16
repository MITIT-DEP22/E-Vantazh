import React from 'react';

interface StatusProps {
    status: string;
}

const StatusIndicator: React.FC<StatusProps> = ({ status }) => {
    const color = status === 'success' ? 'green' : 'red';

    const indicatorStyle = {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: color,
        display: 'inline-block',
        marginRight: '5px',
    };

    return <div style={indicatorStyle} />;
};

export default StatusIndicator;
