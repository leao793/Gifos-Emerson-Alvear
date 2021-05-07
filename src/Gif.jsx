import React from "react";

export default function Gif({ id, title, images }) {
  return (
    <div className="gif-container">
      <img src={images.downsized_medium.url} alt={title} />
    </div>
  );
}
