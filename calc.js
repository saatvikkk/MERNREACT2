import { Circle }  from './icons'
import { Sun } from './themePic'
import { Moon } from './themePic'
import './lightStyle.css'
import Numpad from './numPad'
import React, { useState } from 'react';

function Calculator() {
    const [isSun, setIsSun] = useState(false);
    const math = require('mathjs');
  
    const toggleTheme = () => {
        setIsSun((prevIsSun) => !prevIsSun)
    }
    const cardClass = isSun ? 'card-light' : 'card-dark';
    const [inputVal, changeIn] = useState('')
    const [calVal, calculate] = useState('')

    const [history, setHistory] = useState([]);

    const handleInput = (event)=>{
      if(event === 'backspace'){
        changeIn((prevInputValue) => prevInputValue.slice(0, -1));
      }
      else if(event === 'calculate'){
        calculate(math.evaluate(inputVal))
        setHistory((prevHistory) => {
          const newHistory = [...prevHistory, inputVal];
          if (newHistory.length > 3) {
            newHistory.shift();
          }
          return newHistory;
        });
      }
      else{
        changeIn((prevInputValue) => prevInputValue + event)
      }
    }

  
    return (
      <div className={`card rounded-5 w-25 h-75  d-flex flex-column ${cardClass}`}>
        <div className="ms-4 me-4 d-flex align-items-center" style={{ height: '40px' }}>
          <Circle />
          {isSun ? <Sun onClick={toggleTheme} /> : <Moon onClick={toggleTheme} />}
        </div>
        <div className="text-end pe-4 h-50 d-flex flex-column">
          {history.map((item, index) => (
            <p key={index}>
              {item}
            </p>
          ))}
          <p className="mt-auto h5">{inputVal}</p>
          <p className="mt-auto h3">{calVal}</p>
        </div>

        <div className='d-flex justify-content-center mt-auto h-50'>
            <Numpad isSun={isSun} onButtonClick={handleInput}/>
        </div>
      </div>
    );
}
export default Calculator