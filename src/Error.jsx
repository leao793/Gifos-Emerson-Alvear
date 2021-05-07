import React from "react";

export default function Error() {
  return (
    <div className="error red">
      <iframe
        src="https://giphy.com/embed/jWexOOlYe241y"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
        title="no-found"
      ></iframe>
      <p>No se encontró ningún GIF con tu búsqueda</p>
    </div>
  );
}
