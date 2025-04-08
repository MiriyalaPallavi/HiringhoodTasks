// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Button, Snackbar, Alert } from '@mui/material';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: #f5f5f5;
// `;

// const CalculatorWrapper = styled.div`
//   padding: 20px;
//   background-color: white;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   display: grid;
//   grid-template-columns: repeat(4, 80px);
//   gap: 10px;
// `;

// const Display = styled.div`
//   grid-column: span 4;
//   background-color: #000;
//   color: white;
//   font-size: 2em;
//   text-align: right;
//   padding: 20px;
//   border-radius: 8px;
// `;

// const StyledButton = styled(Button)`
//   background-color: #e0e0e0;
//   font-size: 1.2em;
//   &.equals {
//     background-color: #4caf50;
//     color: white;
//   }
// `;

// const SnackbarContainer = styled.div`
//   position: fixed;
//   top: 10px;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   z-index: 9999;
// `;

// const calculatorapp: React.FC = () => {
//   const [input, setInput] = useState<string>('0');
//   const [error, setError] = useState<string>('');
//   const [open, setOpen] = useState<boolean>(false);

//   const handleClose = () => setOpen(false);

//   const validateInput = (expression: string) => {
//     if (/[^0-9+\-*/%.() ]/.test(expression)) {
//       setError('Only numbers and valid operators are allowed');
//       setOpen(true);
//       return false;
//     }
//     return true;
//   };

//   const handleButtonClick = (value: string) => {
//     if (value === 'C') {
//       setInput('0');
//     } else if (value === 'CE') {
//       const parts = input.trim().split(/([+\-*/%])/);
//       if (parts.length > 1) {
//         parts.pop();
//         setInput(parts.join(''));
//       } else {
//         setInput('0');
//       }
//     } else if (value === '⌫') {
//       setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
//     } else if (value === '=') {
//       try {
//         if (!validateInput(input)) return;
//         if (/\/0(?!\d)/.test(input)) {
//           throw new Error('Division by zero is not allowed');
//         }
//         const result = eval(input);
//         if (isNaN(result) || !isFinite(result)) {
//           throw new Error('Invalid Calculation');
//         }
//         setInput(String(result));
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Invalid Expression');
//         setOpen(true);
//       }
//     } else if (value === 'x²') {
//       setInput((prev) => {
//         const parts = prev.trim().split(/([+\-*/%])/);
//         const lastNum = parseFloat(parts[parts.length - 1]);
//         if (isNaN(lastNum)) return 'Invalid';
//         parts[parts.length - 1] = String(Math.pow(lastNum, 2));
//         return parts.join('');
//       });
//     } else if (value === '²√x') {
//       setInput((prev) => {
//         const parts = prev.trim().split(/([+\-*/%])/);
//         const lastNum = parseFloat(parts[parts.length - 1]);
//         if (isNaN(lastNum) || lastNum < 0) return 'Invalid';
//         parts[parts.length - 1] = String(Math.sqrt(lastNum));
//         return parts.join('');
//       });
//     } else if (value === '1/x') {
//       setInput((prev) => {
//         const num = parseFloat(prev);
//         return isNaN(num) || num === 0 ? 'Invalid' : String(1 / num);
//       });
//     } else {
//       setInput((prev) => (prev === '0' && !isNaN(Number(value)) ? value : prev + value));
//     }
//   };

//   const buttons = [
//     '%', 'CE', 'C', '⌫',
//     '1/x', 'x²', '²√x', '/',
//     '7', '8', '9', '*',
//     '4', '5', '6', '-',
//     '1', '2', '3', '+',
//     '+/-', '0', '.', '='
//   ];

//   return (
//     <Container>
//       <SnackbarContainer>
//         <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
//           <Alert onClose={handleClose} severity="error">
//             {error}
//           </Alert>
//         </Snackbar>
//       </SnackbarContainer>
      
//       <CalculatorWrapper>
//         <Display>{input}</Display>
//         {buttons.map((btn, index) => (
//           <StyledButton
//             key={index}
//             className={btn === '=' ? 'equals' : ''}
//             variant="contained"
//             onClick={() => handleButtonClick(btn)}
//           >
//             {btn}
//           </StyledButton>
//         ))}
//       </CalculatorWrapper>
//     </Container>
//   );
// };

// export default calculatorapp;

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

const ResultDisplay = styled.div`
  font-size: 24px;
  color: #ffd700;
  margin-top: 5px;
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
  const [result, setResult] = useState<string>('0');
  const [isResultDisplayed, setIsResultDisplayed] = useState<boolean>(false);

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        const calcResult = eval(input).toString(); // Evaluate the entire expression
        setResult(calcResult);
        setInput(calcResult); // Update input to show the result
        setIsResultDisplayed(true);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('0');
      setResult('0');
      setIsResultDisplayed(false);
    } else if (value === 'CE') {
      setInput(input.slice(0, -1) || '0');
    } else if (value === '⌫') {
      setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else if (value === '1/x') {
      const num = parseFloat(input);
      if (num === 0) {
        setResult('Error');
      } else {
        const reciprocal = (1 / num).toString();
        setInput(reciprocal);
        setResult(reciprocal);
        setIsResultDisplayed(true);
      }
    } else if (value === 'x²') {
      // Square only the last number entered (the last part of the input)
      const lastNumber = input.split(/[\+\-\*\/\^]/).pop(); // Get the last number before any operator
      if (lastNumber) {
        const squared = (parseFloat(lastNumber) ** 2).toString();
        const updatedInput = input.slice(0, input.lastIndexOf(lastNumber)) + squared;
        setInput(updatedInput); // Update input with squared number
        setResult(updatedInput); // Update result dynamically
      }
    } else if (value === '²√x') {
      const num = parseFloat(input);
      if (num < 0) {
        setResult('Error');
      } else {
        const squareRoot = Math.sqrt(num).toString();
        setInput(squareRoot);
        setResult(squareRoot);
        setIsResultDisplayed(true);
      }
    } else if (value === '+/-') {
      setInput((prev) => (parseFloat(prev) * -1).toString());
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (isResultDisplayed) {
        setInput(result + value); // Append operation to result when already displayed
      } else {
        setInput((prev) => (['+', '-', '*', '/'].includes(prev.slice(-1)) ? prev.slice(0, -1) + value : prev + value));
      }
      setIsResultDisplayed(false); // Reset after each operation
    } else {
      if (isResultDisplayed) {
        setInput(value);
      } else {
        setInput((prev) => (prev === '0' ? value : prev + value));
      }
      setIsResultDisplayed(false); // Reset after each input
    }

    // After any input, update the result dynamically
    try {
      const calcResult = eval(input).toString(); // Re-evaluate the expression
      setResult(calcResult);
    } catch (error) {
      setResult('');
    }
  };

  return (
    <Container>
      <DisplayContainer>
        <InputDisplay displayLength={input.length}>{input}</InputDisplay>
        <ResultDisplay>{result}</ResultDisplay> {/* Display result constantly */}
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








// import React, { useState } from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//   width: 350px;
//   margin: 50px auto;
//   padding: 20px;
//   background-color: #f1f1f1;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const Display = styled.div<{ displayLength: number }>`
//   background-color: #000;
//   color: #fff;
//   font-size: ${(props) => (props.displayLength > 10 ? '24px' : '48px')};
//   padding: 20px;
//   margin-bottom: 20px;
//   border-radius: 4px;
//   text-align: right;
//   overflow-x: auto;
//   white-space: nowrap;
// `;

// const ButtonGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 10px;
// `;

// const Button = styled.button`
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   padding: 12px;
//   font-size: 14px;
//   border-radius: 8px;
//   cursor: pointer;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const CalculatorApp: React.FC = () => {
//   const [input, setInput] = useState<string>('0');
//   const [result, setResult] = useState<string>('');
//   const [isResultDisplayed, setIsResultDisplayed] = useState<boolean>(false);

//   const handleButtonClick = (value: string) => {
//     if (value === '=') {
//       try {
//         const calcResult = eval(input).toString();
//         setResult(calcResult);
//         setInput(calcResult);
//         setIsResultDisplayed(true);
//       } catch (error) {
//         setResult('Error');
//       }
//     } else if (value === 'C') {
//       setInput('0');
//       setResult('');
//       setIsResultDisplayed(false);
//     } else if (value === 'CE') {
//       const lastChar = input.trim().match(/([0-9.]+)$/);
//       if (lastChar) {
//         setInput(input.slice(0, -lastChar[0].length));
//       } else {
//         setInput('0');
//       }
//     } else if (value === '⌫') {
//       setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
//     } else if (value === '1/x') {
//       const num = parseFloat(input);
//       if (num === 0) {
//         setResult('Error');
//       } else {
//         const reciprocal = (1 / num).toString();
//         setInput(reciprocal);
//         setResult(reciprocal);
//       }
//     } else if (value === 'x²') {
//       const num = parseFloat(input);
//       const squared = Math.pow(num, 2).toString();
//       setInput(squared);
//       setResult(squared);
//     } else if (value === '²√x') {
//       const num = parseFloat(input);
//       if (num < 0) {
//         setResult('Error');
//       } else {
//         const squareRoot = Math.sqrt(num).toString();
//         setInput(squareRoot);
//         setResult(squareRoot);
//       }
//     } else if (value === '+/-') {
//       setInput((prev) => (parseFloat(prev) * -1).toString());
//     } else if (['+', '-', '*', '/'].includes(value)) {
//       if (isResultDisplayed) {
//         setInput(result + value);
//         setIsResultDisplayed(false);
//       } else {
//         setInput((prev) => (prev === '0' ? value : prev + value));
//       }
//     } else {
//       if (isResultDisplayed) {
//         setInput(value);
//         setIsResultDisplayed(false);
//       } else {
//         setInput((prev) => (prev === '0' ? value : prev + value));
//       }
//     }
//   };

//   return (
//     <Container>
//       <Display displayLength={(result || input).length}>{result || input}</Display>
//       <ButtonGrid>
//         {['%', 'CE', 'C', '⌫', '1/x', 'x²', '²√x', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '+/-', '0', '.', '=']
//           .map((btn) => (
//             <Button key={btn} onClick={() => handleButtonClick(btn)}>{btn}</Button>
//           ))}
//       </ButtonGrid>
//     </Container>
//   );
// };

// export default CalculatorApp;




