import './App.css';
import { useEffect, useState } from 'react';
// import Settings from './components/Settings.jsx';
import Popup from './components/Popup.jsx';

// TODO:
// 1) Let user pick a time ✅
// 2) Add sound after ring
// 3) Add a reset button
// 4) Add a progress bar
// 5) Add a break timer
// 6) Add total time spent on the timer
// 7) Add background image/animation or a way for user to add their own

function App() {
  // Starting state is 25 minutes
  const [timer, setTimer] = useState(1500);
  const [start, setStart] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const changeStartState = () => {
    if (start === true) {
      setStart(false);
    } else {
      setStart(true);
    }
  };

  // Settings function, need this here to change the timer state
  const handleTimeSubmit = (totalSeconds, isSettingsSaved) => {
    if (isSettingsSaved === true) {
      setTimer(totalSeconds);
      setOpenSettings(false); // Close the popup after setting the time
    } else {
      setOpenSettings(false);
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
      {openSettings && <Popup onSubmit={handleTimeSubmit} />}
      <button onClick={() => setOpenSettings(true)}>Settings</button>
    </>
  );
}

export default App;
