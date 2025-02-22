import { createContext, useState } from "react";
import Game from "./Components/Game";
import GameSetup from "./Components/GameSetup";
export const AppContext = createContext();

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);

  return (
    <AppContext.Provider value={{ cars, setCars, isPlaying, setIsPlaying }}>
      {isPlaying ? (
        <Game cars={selectedCars} />
      ) : (
        <GameSetup
          setIsPlaying={setIsPlaying}
          selectedCars={selectedCars}
          setSelectedCars={setSelectedCars}
        />
      )}
    </AppContext.Provider>
  );
};

export default App;
