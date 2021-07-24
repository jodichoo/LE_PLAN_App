import React, { createContext, useState } from "react";

const themes = {
  dark: {
    backgroundColor: "black",
    backgroundCard: "#25282c",
    color: "white",
  },
  light: {
    backgroundColor: "whitesmoke",
    backgroundCard: "#fff",
    color: "#1d1d1d",
  },
};

const initialState = {
  dark: true,
  theme: themes.dark,
  toggle: () => {},
};
const ThemeContext = createContext(initialState);

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true); // Default theme is dark

  // To toggle between dark and light modes
  function toggle() {
    setDark(!dark);
  };

  function toggleDark(bool) {
      setDark(bool);
  }

  // Filter the styles based on the theme selected
  const theme = dark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ dark, theme, toggle, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
