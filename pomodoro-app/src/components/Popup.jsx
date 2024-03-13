import { useState } from 'react';
import PropTypes from 'prop-types';

const Popup = ({ onSubmit }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // after submitting time, convert to seconds and send it back to the user
  const handleSubmit = () => {
    // Convert hours, minutes, and seconds to total seconds and submit
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    onSubmit(totalSeconds, true);
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
    <div style={popupStyle}>
      <button onClick={handleClose}>close</button>

      <label>
        Set number of hours:
        <input
          name='hoursInput'
          type='number'
          onChange={(e) => setHours(e.target.value)}
          placeholder='Hours'
        />
      </label>

      <label>
        Set number of minutes:
        <input
          name='minutesInput'
          type='number'
          onChange={(e) => setMinutes(e.target.value)}
          placeholder='Minutes'
        />
      </label>

      <label>
        Set number of seconds:
        <input
          name='secondsInput'
          type='number'
          onChange={(e) => setSeconds(e.target.value)}
          placeholder='Seconds'
        />
      </label>
      <button onClick={handleSubmit} style={{ color: 'red' }}>
        Set time
      </button>
    </div>
  );
};

Popup.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Popup;
