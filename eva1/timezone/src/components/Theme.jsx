import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#FFF',
  text: '#000',
  toggleBorder: '#FFF',
};

export const darkTheme = {
  body: '#20232a',
  text: '#FFF',
  toggleBorder: '#6B8096',
};

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    transition: all 0.15s linear;
  }
`;
