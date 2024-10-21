import React from 'react';
import moment from 'moment-timezone';

const Timezone = ({ zone, selectedTime, handleTimeChange, removeTimezone }) => {
  
  const currentHourInZone = moment.tz(selectedTime, zone.name).hour();

  const handleSliderChange = (e) => {
    // const newHour = parseInt(e.target.value, 10);
    // const newTime = moment(selectedTime).hour(newHour).toDate();
    // handleTimeChange(newTime, zone);
  };

  const timeInZone = moment.tz(selectedTime, zone.name).format('HH:mm, DD MMM');

  return (
    <div className="timezone">
      <p>{zone.name}: {timeInZone}</p>
      <input
        type="range"
        min="0"
        max="23"
        value={currentHourInZone}
        onChange={handleSliderChange}
      />
      <button onClick={() => removeTimezone(zone.id)}>X</button>
    </div>
  );
};

export default Timezone;
