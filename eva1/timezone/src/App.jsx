import React, { useState } from 'react';
import moment from 'moment-timezone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled, { ThemeProvider } from 'styled-components';
import Timezone from './components/Timezone';
import { lightTheme, darkTheme, GlobalStyle } from './components/Theme';
import { ThemeToggleButton } from './components/ThemeToggleButton';

const allTimezones = [
  { id: 'UTC', name: 'UTC' },
  { id: 'IST', name: 'Asia/Kolkata' },
  { id: 'ET', name: 'America/New_York' },
  { id: 'PST', name: 'America/Los_Angeles' },
  { id: 'CET', name: 'Europe/Berlin' },
  { id: 'GMT', name: 'Europe/London' },
  { id: 'JST', name: 'Asia/Tokyo' },
  { id: 'AEST', name: 'Australia/Sydney' },
  { id: 'CST', name: 'America/Chicago' },
  { id: 'MST', name: 'America/Denver' },
  { id: 'NZST', name: 'Pacific/Auckland' }
  
];

const App = () => {
  const [zones, setZones] = useState([
    { id: 'UTC', name: 'UTC' },
  ]);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [theme, setTheme] = useState('light');
  const [availableTimezones, setAvailableTimezones] = useState(allTimezones.filter(zone => !zones.find(z => z.id === zone.id)));

  const handleOnDragEnd = (result) => {
  };

  const removeTimezone = (id) => {
    setZones(zones.filter((zone) => zone.id !== id));
    setAvailableTimezones([...availableTimezones, allTimezones.find((zone) => zone.id === id)]);
  };

  const reverseOrder = () => {
    setZones([...zones].reverse());
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const addTimezone = (event) => {
    const selectedZone = allTimezones.find(zone => zone.id === event.target.value);
    setZones([...zones, selectedZone]);
    setAvailableTimezones(availableTimezones.filter(zone => zone.id !== selectedZone.id));
  };

  const handleTimeChange = (newTime, baseTimezone) => {
    
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <div className="app">
        <div id='navbar'>
        <select onChange={addTimezone} defaultValue="">
          <option value="" disabled>Select Timezone</option>
          {availableTimezones.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.name}
            </option>
          ))}
        </select>
        <DatePicker selected={selectedTime} onChange={setSelectedTime} />
        <ThemeToggleButton toggleTheme={toggleTheme} />
        </div>

        

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="timezones">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {zones.map((zone, index) => (
                  <Draggable key={zone.id} draggableId={zone.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Timezone 
                          zone={zone}
                          selectedTime={selectedTime}
                          handleTimeChange={handleTimeChange}
                          removeTimezone={removeTimezone}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <button onClick={reverseOrder}>Reverse Order</button>
        
      </div>
    </ThemeProvider>
  );
};

export default App;
