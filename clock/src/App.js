import './App.css';

const App = () => {
  return (
    <div className="container">
      <div class="row">
        <div class="col-6">
          <div id="session-label">Session Length</div>
          <div id="session-decrement">-</div>
          <div id="session-increment">+</div>
        </div>
        <div className="col-6">
          <div id="break-label">Break Length</div>
          <div id="break-decrement">-</div>
          <div id="break-increment">+</div>
        </div>
      </div>
    </div>
  );
};

export default App;
