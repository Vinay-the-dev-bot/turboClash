import React, { useState } from "react";
import { cars } from "../Constants";

function Game() {
  const [carNameA, setCarNameA] = useState(cars[0]?.name || "Car 1");
  const [carNameB, setCarNameB] = useState(cars[1]?.name || "Car 2");
  const [carA, setCarA] = useState(cars[0]?.stats || {});
  const [carB, setCarB] = useState(cars[1]?.stats || {});
  const [turn, setTurn] = useState("A");
  console.log(turn);
  return (
    <div className="p-6 bg-gray-100 h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">
        Turbo Clash Derby 🚗💥
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow flex flex-col items-end">
          <h2 className="text-xl font-semibold">{carNameA}</h2>
          <p>Health: {carA.health}</p>
          <p>Attack: {carA.attack}</p>
          <p>Defense: {carA.defense}</p>
          <div className="flex flex-col items-end">
            <h2 className="text-xl font-semibold">{carNameA}</h2>
            <button
              onClick={() => setTurn(turn === "A" ? "B" : "A")}
              className="px-4 py-2 bg-blue-500 text-white rounded m-2 mr-0"
              disabled={carA.health <= 0 || carB.health <= 0}
            >
              {turn === "A" ? "Attack" : "Defend"}
            </button>
          </div>
        </div>

        <div className="p-4 bg-white rounded shadow flex flex-col items-start">
          <h2 className="text-xl font-semibold">{carNameB}</h2>
          <p>Health: {carB.health}</p>
          <p>Attack: {carB.attack}</p>
          <p>Defense: {carB.defense}</p>
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-semibold">{carNameB}</h2>
            <button
              onClick={() => setTurn(turn === "A" ? "B" : "A")}
              className="px-4 py-2 bg-blue-500 text-white rounded m-2 ml-0"
              disabled={carA.health <= 0 || carB.health <= 0}
            >
              {turn === "B" ? "Attack" : "Defend"}
            </button>
          </div>
        </div>
      </div>

      <button className="px-4 py-2 m-6  bg-red-500 text-white rounded">
        Reset Game
      </button>
    </div>
  );
}

export default Game;
