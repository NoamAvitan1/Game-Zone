import React, { useState, useEffect } from 'react';
import './Timer.css';

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 100;

const Timer = () => {
    const [timePassed, setTimePassed] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);
    const [remainingPathColor, setRemainingPathColor] = useState(COLOR_CODES.info.color);
  
    useEffect(() => {
      startTimer();
  
      return () => {
        clearInterval(timerInterval);
      };
    }, []);
  
    const onTimesUp = () => {
      clearInterval(timerInterval);
      setRemainingPathColor(COLOR_CODES.info.color); // Reset path color
    };
  
    useEffect(() => {
      const timeLeft = calculateTimeLeft();
  
      if (timeLeft <= 0) {
        onTimesUp();
      } else if (timeLeft <= ALERT_THRESHOLD) {
        setRemainingPathColor(COLOR_CODES.alert.color);
      } else if (timeLeft <= WARNING_THRESHOLD) {
        setRemainingPathColor(COLOR_CODES.warning.color);
      }
    }, [timePassed]);
  
    const calculateTimeLeft = () => {
      return TIME_LIMIT - timePassed;
    };
  
    const startTimer = () => {
      setTimerInterval(setInterval(() => {
        setTimePassed(prevTimePassed => {
          const newTimePassed = prevTimePassed + 1;
          if (newTimePassed >= TIME_LIMIT) {
            onTimesUp();
            return TIME_LIMIT;
          }
          return newTimePassed;
        });
      }, 1000));
    };
  
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
  
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
  
      return `${minutes}:${seconds}`;
    };
  
    const calculateTimeFraction = () => {
      const rawTimeFraction = calculateTimeLeft() / TIME_LIMIT;
      return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    };
  
    const setCircleDasharray = () => {
      const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
      return circleDasharray;
    };
  return (
    <div className="base-timer">
      <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className="base-timer__circle">
          <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="base-timer-path-remaining"
            strokeDasharray={setCircleDasharray()}
            className={`base-timer__path-remaining ${remainingPathColor}`}
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" className="base-timer__label">{formatTime(calculateTimeLeft())}</span>
    </div>
  );
};

export default Timer;
