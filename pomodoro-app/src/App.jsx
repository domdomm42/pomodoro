import { useState, useEffect } from 'react';
import './App.css';
import Popup from './components/Popup';
import schoolbell from '../public/schoolbell.mp3';

function App() {
  // Initial timer in seconds (25 minutes)
  const [timer, setTimer] = useState(1500);
  const [isWorking, setIsWorking] = useState(true); // State to track if it's work time or break time
  const [start, setStart] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [workDuration, setWorkDuration] = useState(1500);
  const [breakDuration, setBreakDuration] = useState(300);

  useEffect(() => {
    let interval = null;

    if (start && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      const sound = new Audio(schoolbell);
      sound.play();
      setIsWorking(!isWorking); // Toggle between work and break time
      setTimer(isWorking ? breakDuration : workDuration); // Set timer for next session
      setStart(false); // Pause the timer
    }

    return () => clearInterval(interval);
  }, [start, timer, isWorking, workDuration, breakDuration]);

  const handleTimeSubmit = (workSeconds, breakSeconds, isSettingsSaved) => {
    if (isSettingsSaved) {
      setWorkDuration(workSeconds);
      setBreakDuration(breakSeconds);
      setTimer(isWorking ? workSeconds : breakSeconds); // Reset the timer based on current state
    }
    setOpenSettings(false);
    setStart(false);
  };

  const toggleStart = () => setStart(!start);
  const openSettingsPopup = () => {
    openSettings === true ? setOpenSettings(false) : setOpenSettings(true);
  };
  const resetTimer = () => {
    setTimer(isWorking ? workDuration : breakDuration);
    setStart(false);
  };

  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;

  const formatedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className='App'>
      <div className='main-app-header'>
        <h1>{isWorking ? 'Work Time' : 'Break Time'}</h1>
        <h2>Timer: {formatedTime}</h2>

        <div className='timerButtons'>
          <button onClick={toggleStart}>{start ? 'Pause' : 'Start'}</button>
          <button onClick={resetTimer}>Reset</button>
          <button onClick={openSettingsPopup}>Settings</button>
        </div>
        {openSettings && (
          <Popup
            workTime={{
              hours: Math.floor(workDuration / 3600),
              minutes: Math.floor((workDuration % 3600) / 60),
              seconds: workDuration % 60,
            }}
            breakTime={{
              hours: Math.floor(breakDuration / 3600),
              minutes: Math.floor((breakDuration % 3600) / 60),
              seconds: breakDuration % 60,
            }}
            onSubmit={handleTimeSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default App;
