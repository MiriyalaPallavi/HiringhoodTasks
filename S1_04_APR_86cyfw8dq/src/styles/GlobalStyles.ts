// src/styles/GlobalStyles.ts
import { createGlobalStyle, DefaultTheme } from "styled-components";
import { Theme } from "@mui/material/styles";

// ✅ Extend DefaultTheme with MUI Theme
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.palette.background.default};
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;
