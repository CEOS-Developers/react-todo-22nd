import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      white: string;
      lightGray: string;
      gray: string;
      darkGray: string;
      lightBlue: string;
      yellow: string;
      yellowDark: string;
      red: string;
      text: {
        primary: string;
        secondary: string;
        disabled: string;
      };
    };
    shadows: {
      small: string;
      medium: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };
  }
}