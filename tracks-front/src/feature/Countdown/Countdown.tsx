import React, {useState, useEffect} from 'react';

interface CountdownProps {
    targetDate: Date; // Формат: 'YYYY-MM-DD'
}

const Countdown: React.FC<CountdownProps> = ({targetDate}) => {
    const calculateTimeRemaining = (): { days: number; hours: number; minutes: number; seconds: number } => {
        const targetTime = targetDate.getTime();
        const currentTime = new Date().getTime();
        const timeDifference = targetTime - currentTime;

        if (timeDifference <= 0) {
            return {days: 0, hours: 0, minutes: 0, seconds: 0};
        }

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        return {
            days: days,
            hours: hours % 24,
            minutes: minutes % 60,
            seconds: seconds % 60,
        };
    };

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [targetDate]);

    return (
        <div className={"d-flex align-items-center h-100"}>
            {`${timeRemaining.days}:${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
        </div>
    );
};

export default Countdown;