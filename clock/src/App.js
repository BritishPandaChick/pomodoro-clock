import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [displayTime, setDisplayTime] = React.useState(25 + 60);
  const [breakTime, setBreakTime] = React.useState(5 + 60);
  const [sessionTime, setSessionTime] = React.useState(25 * 60);
  const [timerOn, setTimerOn] = React.useState(false);

  // Format time function to get minutes and seconds
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (minutes < 10 ? "0" + minutes : minutes) + ":" + seconds < 10 ? "0" + seconds : seconds);
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
  }

  // Control time for play and pause buttons 
  const controlTime = () => {

  }

  return (
    <div className="center-align">
      <div className="dual-container">
        <div>
          <Length
            title={"break length"}
            changeTime={null}
            type={"break"}
            time={breakTime}
            formatTime={formatTime}
          />
          <Length
            title={"session length"}
            changeTime={null}
            type={"session"}
            time={sessionTime}
            formatTime={formatTime}
          />
        </div>
        <h1>{formatTime(displayTime)}</h1>
        <button onClick={controlTime}>
          {timerOn ? (
            < i class="fa-solid fa-circle-pause"></i>
          ) : (
            <i class="fa-solid fa-circle-play"></i>
          )}
        </button>
        <button>
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
