import { useState } from 'react';
import PropTypes from 'prop-types';
import './Popup.css';

const Popup = ({ onSubmit, workTime, breakTime }) => {
  const [workHours, setWorkHours] = useState(workTime.hours);
  const [workMinutes, setWorkMinutes] = useState(workTime.minutes);
  const [workSeconds, setWorkSeconds] = useState(workTime.seconds);

  const [breakHours, setBreakHours] = useState(breakTime.hours);
  const [breakMinutes, setBreakMinutes] = useState(breakTime.minutes);
  const [breakSeconds, setBreakSeconds] = useState(breakTime.seconds);

  const handleSubmit = () => {
    // Convert hours, workMinutes, and workSeconds to total workSeconds and submit
    const totalWorkSeconds =
      parseInt(workHours) * 3600 +
      parseInt(workMinutes) * 60 +
      parseInt(workSeconds);

    const totalBreakSeconds =
      parseInt(breakHours * 3600) +
      parseInt(breakMinutes) * 60 +
      parseInt(breakSeconds);

    if (totalWorkSeconds !== 0 && totalBreakSeconds !== 0) {
      onSubmit(totalWorkSeconds, totalBreakSeconds, true);
    } else {
      alert('Please enter a valid work time or break time');
    }
  };

  const handleClose = () => {
    onSubmit('', false);
  };

  const popupStyle = {
    backgroundColor: 'white',
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <>
      <button onClick={handleClose} style={{ color: 'red' }}>
        close
      </button>
      <div className='settingsMenu'>
        <div style={popupStyle} className='workTimeDiv'>
          <h2>Set your working time</h2>
          <label>
            Set number of Hours:
            <input
              name='workHoursInput'
              type='number'
              value={workHours}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  setWorkHours(e.target.value);
                }
              }}
              onBlur={(e) =>
                e.target.value !== ''
                  ? setWorkHours(e.target.value)
                  : setWorkHours(0)
              }
              style={{ width: '3rem', marginLeft: '0.5rem' }}
              min={0}
              placeholder={workHours}
            />
          </label>

          <label>
            Set number of Minutes:
            <input
              name='workMinutesInput'
              type='number'
              value={workMinutes}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  setWorkMinutes(e.target.value);
                }
              }}
              onBlur={(e) =>
                e.target.value !== ''
                  ? setWorkMinutes(e.target.value)
                  : setWorkMinutes(0)
              }
              style={{ width: '3rem', marginLeft: '0.5rem' }}
              min={0}
              placeholder={workMinutes}
            />
          </label>

          <label>
            Set number of Seconds:
            <input
              name='workSecondsInput'
              type='number'
              value={workSeconds}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  setWorkSeconds(e.target.value);
                }
              }}
              onBlur={(e) =>
                e.target.value !== ''
                  ? setWorkSeconds(e.target.value)
                  : setWorkSeconds(0)
              }
              style={{ width: '3rem', marginLeft: '0.5rem' }}
              min={0}
              placeholder={workSeconds}
              default
            />
          </label>
        </div>

        <div style={popupStyle} className='breakTimeDiv'>
          <h2>Set your break time</h2>
          <label>
            Set number of Hours:
            <input
              name='breakHoursInput'
              type='number'
              value={breakHours}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  setBreakHours(e.target.value);
                }
              }}
              onBlur={(e) =>
                e.target.value !== ''
                  ? setBreakHours(e.target.value)
                  : setBreakHours(0)
              }
              style={{ width: '3rem', marginLeft: '0.5rem' }}
              min={0}
              placeholder={breakHours}
            />
          </label>

          <label>
            Set number of Minutes:
            <input
              name='breakMinutesInput'
              type='number'
              value={breakMinutes}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  setBreakMinutes(e.target.value);
                }
              }}
              onBlur={(e) =>
                e.target.value !== ''
                  ? setBreakMinutes(e.target.value)
                  : setBreakMinutes(0)
              }
              style={{ width: '3rem', marginLeft: '0.5rem' }}
              min={0}
              placeholder={breakMinutes}
            />
          </label>

          <label>
            Set number of Seconds:
            <input
              name='breakSecondsInput'
              type='number'
              value={breakSeconds}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  setBreakSeconds(e.target.value);
                }
              }}
              onBlur={(e) =>
                e.target.value !== ''
                  ? setBreakSeconds(e.target.value)
                  : setBreakSeconds(0)
              }
              style={{ width: '3rem', marginLeft: '0.5rem' }}
              min={0}
              placeholder={breakSeconds}
            />
          </label>
        </div>
      </div>
      <button onClick={handleSubmit} style={{ color: 'red' }}>
        Set time
      </button>
    </>
  );
};

Popup.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  workTime: PropTypes.object.isRequired,
  breakTime: PropTypes.object.isRequired,
};

export default Popup;
