import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { addFav, removeFav, getFav } from "../features/fav/favSlice";
const AddToFavorites = ({ cardId, userId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch=useDispatch();
  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    console.log(cardId,userId);
    console.log(isFavorite);
    console.log("add to fav");
    dispatch(addFav({cardId,userId}))
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