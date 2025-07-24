import { useState } from 'react';
import './App.css';

function App() {
  const [currentValue, setCurrentValue] = useState('0');
  const [pendingOperation, setPendingOperation] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setCurrentValue('0');
    setPendingOperation(null);
    setPreviousValue(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setCurrentValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setCurrentValue(currentValue === '0' ? String(digit) : currentValue + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setCurrentValue('0.');
      setWaitingForOperand(false);
      return;
    }

    if (currentValue.indexOf('.') === -1) {
      setCurrentValue(currentValue + '.');
    }
  };

  const toggleSign = () => {
    const newValue = currentValue.charAt(0) === '-' ? currentValue.substr(1) : '-' + currentValue;
    setCurrentValue(newValue);
  };

  const inputPercent = () => {
    const value = parseFloat(currentValue);
    setCurrentValue(String(value / 100));
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(currentValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (pendingOperation) {
      const currentValue = parseFloat(currentValue);
      const newValue = performCalculation(pendingOperation, previousValue, currentValue);
      
      setPreviousValue(newValue);
      setCurrentValue(String(newValue));
    }

    setWaitingForOperand(true);
    setPendingOperation(nextOperation);
  };

  const performCalculation = (operation, firstValue, secondValue) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    if (!pendingOperation || previousValue === null || waitingForOperand) {
      return;
    }

    const inputValue = parseFloat(currentValue);
    const newValue = performCalculation(pendingOperation, previousValue, inputValue);

    setCurrentValue(String(newValue));
    setPreviousValue(null);
    setPendingOperation(null);
    setWaitingForOperand(true);
  };

  return (
    <div className="app">
      <h1>Calculadora</h1>
      <div className="calculator">
        <div className="calculator-display">{currentValue}</div>
        <div className="calculator-keypad">
          <button className="calculator-key key-clear" onClick={clearAll}>C</button>
          <button className="calculator-key key-sign" onClick={toggleSign}>+/-</button>
          <button className="calculator-key key-percent" onClick={inputPercent}>%</button>
          <button className="calculator-key key-operator" onClick={() => performOperation('/')}>÷</button>
          
          <button className="calculator-key key-7" onClick={() => inputDigit(7)}>7</button>
          <button className="calculator-key key-8" onClick={() => inputDigit(8)}>8</button>
          <button className="calculator-key key-9" onClick={() => inputDigit(9)}>9</button>
          <button className="calculator-key key-operator" onClick={() => performOperation('*')}>×</button>
          
          <button className="calculator-key key-4" onClick={() => inputDigit(4)}>4</button>
          <button className="calculator-key key-5" onClick={() => inputDigit(5)}>5</button>
          <button className="calculator-key key-6" onClick={() => inputDigit(6)}>6</button>
          <button className="calculator-key key-operator" onClick={() => performOperation('-')}>-</button>
          
          <button className="calculator-key key-1" onClick={() => inputDigit(1)}>1</button>
          <button className="calculator-key key-2" onClick={() => inputDigit(2)}>2</button>
          <button className="calculator-key key-3" onClick={() => inputDigit(3)}>3</button>
          <button className="calculator-key key-operator" onClick={() => performOperation('+')}>+</button>
          
          <button className="calculator-key key-0" onClick={() => inputDigit(0)}>0</button>
          <button className="calculator-key key-dot" onClick={inputDot}>.</button>
          <button className="calculator-key key-equals" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;