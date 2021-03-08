import React, { useEffect, useRef, useState } from 'react';
import getRandomWord from '../data/getRandomWord';
import './App.css';

const WORD = getRandomWord();
const NUMBER_OF_ATTEMPTS = 15;

function App() {
  const [currentLetter, setCurrentLetter] = useState('');
  const [previousLetters, setPreviousLetters] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const unsponenValues =
    previousLetters
    .filter(function(letter) {
      if (!WORD.includes(letter)) {
        return true;
      }
      return false;
    });
  const guessedValues =
    previousLetters
    .filter(function(letter) {
      if (!WORD.includes(letter)) {
        return false;
      }
      return true;
    });
    const remainingAttempts = NUMBER_OF_ATTEMPTS - unsponenValues.length;
    const currentValue =
    WORD
    .split('')
    .map(function(letter) {
      if (previousLetters.includes(letter)) {
        return letter;
      }

      return '-';
    })
    .join('');
  const canEnterNewValue = remainingAttempts > 0 && currentValue.includes("-");
  console.log(WORD, currentValue, remainingAttempts > 0, currentValue.includes("-"), canEnterNewValue)


  useEffect(function() {
    if(!currentValue.includes("-")) alert('Вы победили!');
    if(remainingAttempts <= 0) alert(`Вы проиграли! Правильное слово "${WORD}"`);
    if(inputRef.current) inputRef.current.focus()

  }, [previousLetters.length])


  function addPreviousLetter(letter: string) {
    setPreviousLetters([...previousLetters, letter])
  }

  function resetCurrentLetter() {
    setCurrentLetter('')
  }

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('change', event.target.value)

    if(!currentLetter || (currentLetter && !event.target.value)) {
      setCurrentLetter(event.target.value);
    }
  }
  function handleClickButton() {
    console.log('click', currentLetter);

    if (!currentLetter) return;

    addPreviousLetter(currentLetter);
    resetCurrentLetter()
  }

  return (
    <div className="App">
      <div className="mb-3">
        <label className="form-label">При ошибке теряешь очко</label>
        <input className="form-control word" readOnly value={currentValue} />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">{`Осталось ${remainingAttempts} попыток`}</span>
        <input className="form-control" placeholder="Введите букву" ref={inputRef} disabled={!canEnterNewValue} onChange={handleChangeInput} value={currentLetter} />
        <button className="btn btn-outline-secondary" type="button" disabled={!canEnterNewValue} onClick={handleClickButton}>Угадать</button>
      </div>
    </div>
  );
}

export default App;
