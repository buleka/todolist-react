import React, { createContext, useContext, useState, useEffect } from 'react'

export const ThemeContext = createContext(null)

export const ThemeProvider = (props) => {

  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {props.children}
    </ThemeContext.Provider>
  )
}