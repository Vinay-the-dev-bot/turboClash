import { useState } from "react";
import { cars } from "../Constants";

const GameSetup = ({ setIsPlaying, setSelectedCars, selectedCars }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCar = cars[currentIndex];
  const prevCar = cars[currentIndex - 1] || null;
  const nextCar = cars[currentIndex + 1] || null;

  const handleSelectCarWorking = (car) => {
    // if (selectedCars.some((c) => c.id === car.id) || selectedCars.length == 2)
    if (selectedCars.length == 2) return;
    // const updatedCarsList = selectedCars.filter((c) => c.id !== car.id);
    //   setSelectedCars(updatedCarsList);
    setSelectedCars([...selectedCars, car]);
  };
  console.log({ selectedCars });
  const handleNext = () => {
    if (currentIndex < cars.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Car Display Section */}
      <div className="relative flex items-center justify-center w-full h-48">
        {/* Previous Car (Left Side, Smaller & Faded) */}
        {prevCar && (
          <img
            src={prevCar.image}
            alt={prevCar.name}
            className="absolute left-10 w-28 h-28 opacity-50 scale-75"
          />
        )}

        {/* Current Car (Centered) */}
        <img
          src={currentCar.image}
          alt={currentCar.name}
          className="w-40 h-40"
        />

        {/* Next Car (Right Side, Smaller & Faded) */}
        {nextCar && (
          <img
            src={nextCar.image}
            alt={nextCar.name}
            className="absolute right-10 w-28 h-28 opacity-50 scale-75"
          />
        )}
      </div>
      {selectedCars.map((car) => (
        <img src={car.image} />
      ))}
      {/* Control Buttons */}
      <div className="flex gap-[30px]">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <button
          className="px-6 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md transition"
          onClick={() => handleSelectCarWorking(currentCar)}
          disabled={
            selectedCars.includes(currentCar) || selectedCars.length >= 2
          }
        >
          Select
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
          onClick={handleNext}
          disabled={currentIndex === cars.length - 1}
        >
          Next
        </button>
      </div>
      <button
        onClick={() => {
          setIsPlaying(true);
        }}
      >
        Play
      </button>
    </div>
  );
};

export default GameSetup;
