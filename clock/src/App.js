import { useState } from 'react';
import './App.css';

function App() {
  const [displayTime, setDisplayTime] = React.useState(25 + 60);
  const [breakTime, setBreakTime] = React.useState(5 * 60);
  const [sessionTime, setSessionTime] = React.useState(25 * 60);
  const [timerOn, setTimerOn] = React.useState(false);
  const [onBreak, setOnBreak] = React.useState(false);

  // Format time function to get minutes and seconds
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  // Change Time function to change time 
  const changeTime = (amount, type) => {
    if (type == 'break') {
      if (breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) {
        return;
      }
      setSessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };

  // Control time for play and pause buttons 
  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;

    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();

        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 0 && !onBreakVariable) {
              onBreakVariable = true;
              setOnBreak(true);
              return breakTime;
            } else if (prev <= 0 && onBreakVariable) {
              onBreakVariable = false;
              return sessionTime;
            }
            return prev - 1;
          });
          newDate += second
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem('interval-id', interval);
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  };

  // reset the time 
  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
  };

  return (
    <div className="App center-align">
      <div className="dual-container">
        <div>
          <Length
            title={"break length"}
            changeTime={changeTime}
            type={"break"}
            time={breakTime}
            formatTime={formatTime}
          />
          <Length
            title={"session length"}
            changeTime={changeTime}
            type={"session"}
            time={sessionTime}
            formatTime={formatTime}
          />
        </div>

        <h3>{onBreak ? "Break" : "Session"}</h3>
        <h1>{formatTime(displayTime)}</h1>
        <button onClick={controlTime}>
          {timerOn ? (
            <i class="fa-solid fa-circle-pause"></i>
          ) : (
            <i class="fa-solid fa-circle-play"></i>
          )}
        </button>
        <button onClick={resetTime}>
          <i class="fa-solid fa-backward"></i>
        </button>
      </div>
    </div>
  );
}

//Second component to figure out length
function Length({ title, changeTime, type, time, formatTime }) {
  return (
    <div>
      <h3>{title}</h3>
      <div className="time-sets">
        <button onClick={() => changeTime(-60, type)}>-</button>
        <h3>{formatTime(time)}</h3>
        <button onClick={() => changeTime(60, type)}>+</button>
      </div>
    </div>
  );
}

export default App;
