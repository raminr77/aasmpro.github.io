import React, { useState, useEffect } from 'react';
import { randomChar } from '../utils/randomChar';

export const Char = ({ value }) => {
  const [color, setColor] = useState('dark');
  const [char, setChar] = useState(randomChar());

  const changeColor = () => {
    if (value) return;
    if (char === '0' || char === '1') {
      setColor(color === 'red' ? 'dark' : 'red');
    }
  };

  const classes = `select-none px-2 text-2xl font-bold text-${value ? 'light' : color}-0`;

  useEffect(() => {
    const interval = setInterval(
      () => {
        setChar((char) => (char !== '0' && char !== '1' ? randomChar() : char));
      },
      Math.floor(Math.random() * 30000) + 2000
    );
    return () => clearInterval(interval);
  }, []);

  if (value === '↓') {
    return (
      <a href='#info' title='Scroll Down!'>
        <span className={classes}>
          <span className='animate-bounce absolute mt-1 mr-3.5'>{value}</span>
        </span>
      </a>
    );
  }

  return (
    <button className={classes} onClick={changeColor}>
      {value || char}
    </button>
  );
};

export const getCharsMatrix = (row, col) => {
  let charsMatrix = [];
  for (var i = 0; i < row; i++) {
    let _row = [];
    for (var j = 0; j < col; j++) {
      _row.push(<Char />);
    }
    charsMatrix.push(_row);
  }
  return charsMatrix;
};

export const setCharsMatrix = (
  charsMatrix,
  values,
  from_row,
  to_row,
  from_col,
  to_col
) => {
  for (var i = from_row; i < to_row; i++) {
    for (var j = from_col; j < to_col; j++) {
      let char = null;
      try {
        char = values[i - from_row][j - from_col];
      } catch {}
      try {
        charsMatrix[i][j] = char && char !== ' ' ? <Char value={char} /> : <Char />;
      } catch {}
    }
  }
  return charsMatrix;
};
