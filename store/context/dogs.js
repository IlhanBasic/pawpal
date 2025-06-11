import { createContext, useEffect, useState } from "react";
import DOGS from "../../data/dogs";
import { getDogsAsync } from "../../utils/http";
export const DogsContext = createContext({
  dogs: [],
  addDog: () => {},
  removeDog: () => {},
  updateDog: () => {},
});
function DogsContextProvider(props) {
  const [dogs, setDogs] = useState([]);
  useEffect(() => {
    async function fetchDogs() {
      const dogs = await getDogsAsync();
      setDogs(dogs);
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
  function updateDogHandler(id, dog) {
    setDogs((prevDogs) => {
      return prevDogs.map((item) => (item.name === id ? dog : item));
    });
  }
  const ctxValue = {
    dogs: dogs,
    addDog: addDogHandler,
    removeDog: removeDogHandler,
    updateDog: updateDogHandler,
  };
  return (
    <DogsContext.Provider value={ctxValue}>
      {props.children}
    </DogsContext.Provider>
  );
}
export default DogsContextProvider;
