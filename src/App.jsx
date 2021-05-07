import React, { useState } from "react";
import "./styles.css";
import Header from "../src/Header-Search";

export default function App() {
  //hooks estado modo nocturno
  const [darkMode, setDarkMode] = useState(false);

  //manejador estado boton modo nocturno
  const changeDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <Header setDarkMode={changeDarkMode} darkMode={darkMode} />
    </div>
  );
}
