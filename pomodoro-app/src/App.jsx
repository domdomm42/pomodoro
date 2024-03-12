import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [timer, setTimer] = useState(3600);
  const [start, setStart] = useState(false);

  const changeStartState = () => {
    if (start === true) {
      setStart(false);
    } else {
      setStart(true);
    }
  };

  // Checks the state of start and timer, if start is true and timer is not 0,
  // it will decrement the timer by 1 every second
  useEffect(() => {
    if (timer === 0 || !start) {
      return;
    }
    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [start, timer]);

  // Do calculation to get the hours, minutes and seconds from total seconds
  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;

  // Format the time to be displayed, this rerenders every second cause timer changes every second
  const formatedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Should play some sounds
  if (timer === 0) {
    return <h1>Time&apos;s up!</h1>;
  }

  return (
    <>
      {formatedTime}
      <button onClick={changeStartState}>
        {start === true ? 'Pause' : 'Start'}
      </button>
    </>
  );
}

export default App;
