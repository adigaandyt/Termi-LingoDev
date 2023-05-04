import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { MdOutlineFavorite, MdOutlineFavoriteBorder} from "react-icons/md";
import { addFav, removeFav, getFav } from "../features/fav/favSlice";
const AddToFavorites = ({ cardId, userId }) => {
const { isLoading } = useSelector((state) => state.fav);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch=useDispatch();
  
  const handleAddToFavorites = () => {
    if (isFavorite) {
      // show confirmation popup before removing the favorite
      if (window.confirm("Are you sure you want to remove this from favorites?")) {
        setIsFavorite(false);
        console.log(cardId, userId);
        console.log(isFavorite);
        console.log("remove from fav");
        dispatch(removeFav({ itemId: cardId}));
      }
    } else {
      setIsFavorite(true);
      console.log(cardId, userId);
      console.log(isFavorite);
      console.log("add to fav");
      dispatch(addFav({ itemId: cardId, isFavorite: true }));
    }
  };
  

  return (
<button
  disabled={isLoading}
  onClick={handleAddToFavorites}
  className={`add-to-favorites ${isFavorite ? "favorite" : ""}`}
>
  {isFavorite ? "Remove from favorites" : "Add to favorites"}
</button>

  );
};

export default AddToFavorites;