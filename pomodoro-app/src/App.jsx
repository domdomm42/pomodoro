import { useState, useEffect } from 'react';
import './App.css';
import Popup from './components/Popup';
import schoolbell from './schoolbell.mp3';
import { NextUIProvider } from '@nextui-org/react';
import { Progress } from '@nextui-org/react';

function App() {
  const [timer, setTimer] = useState(1500);
  const [isWorking, setIsWorking] = useState(true); // State to track if it's work time or break time
  const [start, setStart] = useState(false);
  const [workDuration, setWorkDuration] = useState(1500);
  const [breakDuration, setBreakDuration] = useState(300);

  // tracks the number of percentage in which the work or break is being done out of 100
  const timerPercentageDone =
    100 - (timer / (isWorking ? workDuration : breakDuration)) * 100;

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
    setStart(false);
  };

  const toggleStart = () => setStart(!start);

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
    <NextUIProvider>
      <div className='App'>
        <div className='main-app-header'>
          <h1 className='font-bold m-4'>
            {isWorking ? 'Work Time' : 'Break Time'}
          </h1>
          <h2>Timer: {formatedTime}</h2>
          <div className='timerButtons'>
            <button onClick={toggleStart}>{start ? 'Pause' : 'Start'}</button>
            <button onClick={resetTimer}>Reset</button>
          </div>
          <Progress
            size='md'
            radius='full'
            classNames={{
              base: 'max-w-md',
              track: 'drop-shadow-md border border-default',
              indicator: isWorking
                ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                : 'bg-gradient-to-r from-green-500 to-teal-500',
              label: 'tracking-wider font-medium text-default-600',
              value: 'text-foreground/60',
            }}
            value={timerPercentageDone}
            showValueLabel={true}
          />

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
        </div>
      </div>
    </NextUIProvider>
  );
}

export default App;
