import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 350px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: #000;
  color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  text-align: right;
  overflow-x: auto;
  white-space: nowrap;
`;

const InputDisplay = styled.div<{ displayLength: number }>`
  font-size: ${(props) => (props.displayLength > 10 ? '24px' : '48px')};
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 12px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const CalculatorApp: React.FC = () => {
  const [input, setInput] = useState<string>('0');
  const [isResultDisplayed, setIsResultDisplayed] = useState<boolean>(false);

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        const calcResult = eval(input).toString();
        setInput(calcResult);
        setIsResultDisplayed(true);
      } catch (error) {
        setInput('Error');
      }
    } else if (value === 'C') {
      setInput('0');
      setIsResultDisplayed(false);
    } else if (value === 'CE') {
      setInput(input.slice(0, -1) || '0');
    } else if (value === '⌫') {
      setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else if (value === '1/x' || value === 'x²' || value === '²√x') {
      const match = input.match(/(\d+\.?\d*)$/);
      if (match) {
        const lastNumber = match[0];
        let newNumber = lastNumber;
        if (value === '1/x') {
          newNumber = (1 / parseFloat(lastNumber)).toString();
        } else if (value === 'x²') {
          newNumber = (parseFloat(lastNumber) ** 2).toString();
        } else if (value === '²√x') {
          newNumber = parseFloat(lastNumber) >= 0 ? Math.sqrt(parseFloat(lastNumber)).toString() : 'Error';
        }
        setInput(input.replace(/(\d+\.?\d*)$/, newNumber));
      }
    } else if (value === '+/-') {
      setInput((prev) => (parseFloat(prev) * -1).toString());
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (isResultDisplayed) {
        setInput(input + value);
      } else {
        setInput((prev) => (['+', '-', '*', '/'].includes(prev.slice(-1)) ? prev.slice(0, -1) + value : prev + value));
      }
      setIsResultDisplayed(false);
    } else {
      if (isResultDisplayed) {
        setInput(value);
      } else {
        setInput((prev) => (prev === '0' ? value : prev + value));
      }
      setIsResultDisplayed(false);
    }
  };

  return (
    <Container>
      <DisplayContainer>
        <InputDisplay displayLength={input.length}>{input}</InputDisplay>
      </DisplayContainer>
      <ButtonGrid>
        {['%', 'CE', 'C', '⌫', '1/x', 'x²', '²√x', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '+/-', '0', '.', '=']
          .map((btn) => (
            <Button key={btn} onClick={() => handleButtonClick(btn)}>{btn}</Button>
          ))}
      </ButtonGrid>
    </Container>
  );
};

export default CalculatorApp;
