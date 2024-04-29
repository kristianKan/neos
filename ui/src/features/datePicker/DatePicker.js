import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { isL2RSet, dateSet } from './datePickerSlice'

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; 
  }
`
const StyledSpan = styled.span`
  color: #fff;
  font-size: 10px;
  margin: 4px 0px;
  padding: 2px;
  cursor: pointer;
  user-select: none;
  border-bottom: ${props => props.isSelected ? '1px solid blue' : 'none' };
  border-right: ${props => props.isSelected ? '1px solid blue' : 'none' };
  background-color: ${props => props.isSelected ? '#ff00ff' : 'transparent'};
  &:hover {
    background-color: rgba(0, 0, 255, 1);
  }
`

function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const DatePicker = ({ unit }) => {
  const dispatch = useDispatch()
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedDate = useSelector(state => state.datePicker.date[unit]);
  const { day, month, year } = useSelector(state => state.datePicker.date);
  const [dates, setDates] = useState([]);
  const selectedRef = useRef(null);

  const dateGenerators = {
    day: () => Array.from({length: getDaysInMonth(month, year)}, (_, i) => i + 1),
    month: () => Array.from({length: 12}, (_, i) => i + 1),
    year: () => Array.from({length: 2200-1900+1}, (_, i) => i + 1900),
  };

  useEffect(() => {
    const generateDates = dateGenerators[unit];
    if (generateDates) {
      setDates(generateDates());
    }
  }, [unit, year, month]);

  useEffect(() => {
    // Create a new mutation observer
    const observer = new MutationObserver(() => {
      if (selectedRef.current) {
        selectedRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  
    // Start observing the document with the configured parameters
    observer.observe(document, { childList: true, subtree: true });
  
    // Clean up the observer on unmount
    return () => observer.disconnect();
  }, []);

  const handleMouseDown = (value) => {
    const index = dates.indexOf(value);
    if (index !== -1) {
      const isL2R = index > currentIndex;
      setCurrentIndex(index);
      dispatch(isL2RSet({ isL2R }))
      dispatch(dateSet({ unit, value }))
    }
  };

  return (
    <StyledContainer>
      {dates.map((date, index) => {
        const isSelected = date === selectedDate;
        return (
          <StyledSpan
            key={date}
            day={date}
            isSelected={isSelected}
            onMouseDown={() => handleMouseDown(date)}
            ref={isSelected ? selectedRef : null}
          >
            {date}
          </StyledSpan>
        )
      })}
    </StyledContainer>
  );
};

export default DatePicker;