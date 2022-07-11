import './App.css';

function App() {
  return (
    <div className="App container">
      <div className="row">
        <div className="break-setting">
          <div id="break-label"></div>
          <div id="break-increment"></div>
          <div id="break-length"></div>
          <div id="break-decrement"></div>
        </div>

        <div className="session-setting">
          <div id="session-label"></div>
          <div id="session-increment"></div>
          <div id="session-length"></div>
          <div id="session-decrement"></div>
        </div>
      </div>

      <div className="timer">
        <div id="timer-label"></div>
        <div id="time-left"></div>

        <div className="row">
          <div id="start_stop"></div>
          <div id="reset"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
