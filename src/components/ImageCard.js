import React from "react";
import "./my.css";

const ImageCard = (props) => {
  const { image } = props;

  return (
    <div className="image-card">
      <img src={image.urls.small} alt={image.alt_description} />
      <div className="image-details">
        <p className="image-description">
          {image.description || "No Description"}
        </p>
        <a href={image.links.html} target="_blank" rel="noopener noreferrer">
          View on Unsplash
        </a>
      </div>
    </div>
  );
};

export default ImageCard;
