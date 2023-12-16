import React, {FC, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';

const Timer: FC<any> = ({nextPage, time}) => {
     // 5 minutes in seconds
    const [currentTime, setCurrentTime] = useState(time);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            if (currentTime === 0) {
                clearInterval(timerInterval);
                nextPage()
            } else {
                setCurrentTime(currentTime - 1);
            }
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [currentTime]);

    const formatTime = () => {
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <Container className="text-center mt-5">
            <h1>Таймер Відліку</h1>
            <div id="timer" className="display-4">{formatTime()}</div>
        </Container>
    );
};

export default Timer;
