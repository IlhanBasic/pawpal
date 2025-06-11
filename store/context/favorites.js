import { createContext, useState,useEffect } from "react";
import { getFavoritesAsync } from "../../utils/http";
export const FavoritesContext = createContext({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});
function FavoritesContextProvider(props) {
  const [favorites, setDogs] = useState([]);
  useEffect(() => {
    async function fetchDogs() {
      const dogs = await getFavoritesAsync();
      setDogs([...dogs]);
    }
    fetchDogs();
  }, []);
  function addDogHandler(dog) {
    setDogs((prevDogs) => {
      return [...prevDogs, dog];
    });
  }
  function removeDogHandler(id) {
    setDogs((prevDogs) => {
      return prevDogs.filter((dog) => dog.name !== id);
    });
  }
  const ctxValue = {
    favorites: favorites,
    addToFavorites: addDogHandler,
    removeFromFavorites: removeDogHandler,
  };
  return (
    <FavoritesContext.Provider value={ctxValue}>
      {props.children}
    </FavoritesContext.Provider>
  );
}
export default FavoritesContextProvider;
