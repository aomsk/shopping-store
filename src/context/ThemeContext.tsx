import { createContext, useState } from "react";

interface IthemeContext {
  theme: string;
  toggleTheme?: () => void;
}

const defaultState = {
  theme: "light",
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const ThemeContext = createContext<IthemeContext>(defaultState);

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(defaultState.theme);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    }
    if (theme === "dark") {
      setTheme("light");
    }
    console.log(theme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
