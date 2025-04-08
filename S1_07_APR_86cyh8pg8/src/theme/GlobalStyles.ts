import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }
`;
export const lightTheme = {
    body: '#ffffff',
    text: '#121212',
    toggleBorder: '#fff',
    background: '#f8f9fa',
  };
  export const darkTheme = {
    body: '#121212',
    text: '#ffffff',
    toggleBorder: '#6B8096',
    background: '#1c1c1c',
  };