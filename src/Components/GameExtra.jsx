import React, { useState } from "react";
import axios from "axios";
import { baseURL, cars } from "../Constants";

function Game() {
  const [carNameA, setCarNameA] = useState(cars[0]?.name || "Car 1");
  const [carNameB, setCarNameB] = useState(cars[1]?.name || "Car 2");
  const [carA, setCarA] = useState(cars[0]?.stats || {});
  const [carB, setCarB] = useState(cars[1]?.stats || {});
  const [turn, setTurn] = useState("A");
  const [battleLog, setBattleLog] = useState([]);

  const rollDice = async () => {
    const attacker = turn === "A" ? carA : carB;
    const defender = turn === "A" ? carB : carA;

    try {
      const response = await axios.post(`${baseURL}/roll`, {
        attacker,
        defender
      });

      const { attackRoll, defenseRoll, netDamage, defenderHealth } =
        response.data;
      console.log({ attackRoll, defenseRoll, netDamage, defenderHealth });
      if (turn === "A") {
        setCarB((prev) => ({ ...prev, health: defenderHealth }));
      } else {
        setCarA((prev) => ({ ...prev, health: defenderHealth }));
      }

      setBattleLog((prev) => [
        ...prev,
        `Car ${turn} rolled attack: ${attackRoll}, Car ${
          turn === "A" ? "B" : "A"
        } rolled defense: ${defenseRoll}. Damage dealt: ${netDamage}.`
      ]);

      setTurn((prev) => (prev === "A" ? "B" : "A"));
    } catch (error) {
      console.error("Error rolling dice:", error);
    }
  };

  const Attack = async () => {
    const attacker = turn === "A" ? carA : carB;
    const defender = turn === "A" ? carB : carA;

    try {
      const response = await axios.post(`${baseURL}/attack`, {
        attacker,
        defender
      });

      const { attackRoll, defenseRoll, netDamage, defenderHealth } =
        response.data;
      console.log({ attackRoll, defenseRoll, netDamage, defenderHealth });
      if (turn === "A") {
        setCarB((prev) => ({ ...prev, health: defenderHealth }));
      } else {
        setCarA((prev) => ({ ...prev, health: defenderHealth }));
      }

      setBattleLog((prev) => [
        ...prev,
        `Car ${turn} rolled attack: ${attackRoll}, Car ${
          turn === "A" ? "B" : "A"
        } rolled defense: ${defenseRoll}. Damage dealt: ${netDamage}.`
      ]);

      setTurn((prev) => (prev === "A" ? "B" : "A"));
    } catch (error) {
      console.error("Error rolling dice:", error);
    }
  };

  const Defend = async () => {
    const attacker = turn === "A" ? carA : carB;
    const defender = turn === "A" ? carB : carA;

    try {
      const response = await axios.post(`${baseURL}/defend`, {
        attacker,
        defender
      });

      const { attackRoll, defenseRoll, netDamage, defenderHealth } =
        response.data;
      console.log({ attackRoll, defenseRoll, netDamage, defenderHealth });
      if (turn === "A") {
        setCarB((prev) => ({ ...prev, health: defenderHealth }));
      } else {
        setCarA((prev) => ({ ...prev, health: defenderHealth }));
      }

      setBattleLog((prev) => [
        ...prev,
        `Car ${turn} rolled attack: ${attackRoll}, Car ${
          turn === "A" ? "B" : "A"
        } rolled defense: ${defenseRoll}. Damage dealt: ${netDamage}.`
      ]);

      setTurn((prev) => (prev === "A" ? "B" : "A"));
    } catch (error) {
      console.error("Error rolling dice:", error);
    }
  };

  const resetGame = async () => {
    try {
      const response = await axios.post(`${baseURL}/reset`);
      setCarA(response.data.carA);
      setCarB(response.data.carB);
      setBattleLog([]);
      setTurn("A");
    } catch (error) {
      console.error("Error resetting game:", error);
    }
  };
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
              onClick={rollDice}
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
              onClick={rollDice}
              className="px-4 py-2 bg-blue-500 text-white rounded m-2 ml-0"
              disabled={carA.health <= 0 || carB.health <= 0}
            >
              {turn === "B" ? "Attack" : "Defend"}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={resetGame}
        className="px-4 py-2 m-6  bg-red-500 text-white rounded"
      >
        Reset Game
      </button>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold">Battle Log</h2>
        <div className="mt-2">
          {battleLog.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
