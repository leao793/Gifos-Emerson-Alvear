import React from "react";
import Gif from "../src/Gif";
import Error from "../src/Error";

//componente
export default function Results({ darkMode, gifs, category }) {
  return (
    <div className={`gif-results ${darkMode ? "dark" : "light"}`}>
      <h2 className={`${darkMode ? "dark" : "light"}`}>
        Resultados de la búsqueda <strong>{category}</strong>
      </h2>
      <div className="gif-results-container">
        {gifs.data.length > 0 ? (
          gifs.data.map((gif) => <Gif key={gif.id} {...gif} />)
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}
