import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {BsFillBookmarkStarFill} from "react-icons/bs";
import { addFav, removeFav, getFav } from "../features/fav/favSlice";
const AddToFavorites = ({ cardId, userId ,isFavorite,setIsFavorite }) => {
const { isLoading } = useSelector((state) => state.fav);
  const dispatch=useDispatch();
  
  const handleAddToFavorites = () => {
    if (isFavorite) {
        setIsFavorite(false);
        dispatch(removeFav({ itemId: cardId}));
    } else {
      setIsFavorite(true);
      dispatch(addFav({ itemId: cardId, isFavorite: true }));
    }
  };
  

  return (
<BsFillBookmarkStarFill
  disabled={isLoading}
  onClick={handleAddToFavorites}
  className={`add-to-favorites display-6 m-3 ${isFavorite ? "text-warning" : "text-secondary"}`}
/>

  );
};

export default AddToFavorites;