import React, { useState } from "react";

const AddToFavorites = ({ cardId, onAddToFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    onAddToFavorites(cardId);
  };

  return (
    <button
      onClick={handleAddToFavorites}
      className={`add-to-favorites ${isFavorite ? "favorite" : ""}`}
    >
      {isFavorite ? "Remove from favorites" : "Add to favorites"}
    </button>
  );
};

export default AddToFavorites;