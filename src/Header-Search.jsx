import React, { useEffect, useState, useRef } from "react";
import Results from "../src/Results";
import Write from "../src/Write";

export default function Header({ setDarkMode, darkMode }) {
  //hooks estados data de API
  const [dataGif, setDataGif] = useState(null);
  const [suggestedGifsList, setSuggestedGifsList] = useState(null);
  //hooks estados eventos de busqueda
  const [search, setSearch] = useState(false);
  const [searchList, setSearchList] = useState("");
  //hooks estados de categoria a buscar
  const [category, setCategory] = useState("");
  const [key, setKey] = useState("");
  //hook estado de cargando...
  const [loading, setLoading] = useState(false);
  //hook estado de container de sugerencias
  const [display, setDisplay] = useState(false);

  //manejador estado Link de sugerencia
  const changeLinkSearch = (e) => {
    setSearch(true);
    setSearchList(e.target.innerHTML);
    setCategory(e.target.innerHTML);
    setDisplay(false);
  };

  //manejador estado boton
  const changeBtnSearch = (e) => {
    setSearch(true);
    setSearchList(category);
    setCategory(buscar.current.value);
    setDisplay(false);
    e.preventDefault();
  };

  //manejador estado input
  const changeInputSearch = (e) => {
    setCategory(e.target.value);
    setKey(buscar.current.value);
  };

  //referente buscar del input
  const buscar = useRef(null);

  //API-KEY
  const API_KEY = "1nqd9PU1QGjdZP9u17fHqjNv2gOGfvCi";

  //efecto secundario de busqueda
  useEffect(() => {
    if (search) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchList}&limit=12&offset=0&rating=g&lang=en`
        )
          .then((res) => res.json())
          .then((data) => {
            setSearch(false);
            setDataGif(data);
          });
      }, 3000);
    }
  }, [search, searchList]);

  //efecto secundario de sugerencias
  useEffect(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}&q=${key}&limit=5`
    )
      .then((res) => res.json())
      .then((suggestedGifs) => {
        if (key.length > 0) {
          setSuggestedGifsList(suggestedGifs.data);
          setDisplay(true);
        } else {
          setDisplay(false);
        }
      });
  }, [key]);

  return (
    <div className="container">
      <div className={`header ${darkMode ? "dark" : "light"}`}>
        {darkMode ? (
          <img src="./images/logo-desktop-noc.svg" alt="logo" />
        ) : (
          <img src="./images/logo-desktop.svg" alt="logo" />
        )}
        <button
          className={`btn-mode ${darkMode ? "dark" : "light"}`}
          onClick={setDarkMode}
        >
          MODO {darkMode ? "CLARO" : "OSCURO"}
        </button>
      </div>
      <div className={`search ${darkMode ? "dark" : "light"}`}>
        <h1 className={`${darkMode ? "dark" : "light"}`}>
          ¡Inspirate y busca los mejores <strong>GIFS</strong>!
        </h1>
        <img src="./images/ilustra_header.svg" alt="img-header" />
        <div className="form-search">
          <form onSubmit={changeBtnSearch}>
            <input
              className={`input-search ${darkMode ? "dark" : "light"}`}
              type="text"
              placeholder="Busca gifs"
              name="search"
              value={category}
              onChange={changeInputSearch}
              ref={buscar}
              autoComplete="off"
            />
            <button
              className={`btn-search ${darkMode ? "dark" : "light"}`}
              onClick={changeBtnSearch}
              type="button"
            >
              <img src="./images/icon-search.svg" alt="img-search" />
            </button>
          </form>
        </div>

        {display && suggestedGifsList.length > 0 && (
          <div className={`suggestion ${darkMode ? "dark" : "light"}`}>
            <ul>
              {suggestedGifsList.map((suggestedGif, index) => {
                return (
                  <li key={index} onClick={changeLinkSearch}>
                    {suggestedGif.name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      {loading && (
        <div className={`loading ${darkMode ? "dark" : "light"}`}>
          <img src="./images/spinner.svg" alt="spinner" />
        </div>
      )}
      {category === "" ? (
        <Write />
      ) : (
        dataGif && (
          <Results darkMode={darkMode} category={category} gifs={dataGif} />
        )
      )}
    </div>
  );
}
