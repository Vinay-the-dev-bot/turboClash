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
  const [damage, setDamage] = useState(0);
  const [message, setMessage] = useState("");
  const updateHealth = ({
    attacker,
    attackDamage,
    defender,
    defenderHealth
  }) => {
    if (attacker === "A") {
      setCarB((prev) => ({ ...prev, health: defenderHealth }));
    } else {
      setCarA((prev) => ({ ...prev, health: defenderHealth }));
    }
  };

  const handleAction = async (type) => {
    const attacker = turn === "A" ? carA : carB;
    const defender = turn === "A" ? carB : carA;

    try {
      const response = await axios.post(`${baseURL}/${type}`, {
        attacker,
        defender,
        damage
      });

      const {
        attackRoll,
        attackDamage,
        defenseRoll,
        netDamage,
        defenderHealth
      } = response.data;

      updateHealth({ turn, attackDamage, defender, defenderHealth });

      if (type === "attack") {
        setBattleLog((prev) => [
          ...prev,
          `Car ${turn} attacked with a roll of ${attackRoll}, dealing ${netDamage} damage!`
        ]);
      } else if (type === "defend") {
        setBattleLog((prev) => [
          ...prev,
          `Car ${turn === "A" ? "B" : "A"} defended successfully!`
        ]);
      }
      console.log({ attackRoll, defenseRoll, netDamage, defenderHealth, type });
      if (type === "defend") {
        setTurn((prev) => (prev === "A" ? "B" : "A"));
        setMessage(`${turn} defended successfully`);
      } else {
        setMessage(`${turn} attacked`);
      }
    } catch (error) {
      console.error(`Error during ${type}:`, error);
    }
  };

  const resetGame = async () => {
    try {
      const response = await axios.post(`${baseURL}/reset`);
      setCarA(response.data.carA);
      setCarB(response.data.carB);
      setBattleLog([]);
      setTurn("A");
      setMessage("");
    } catch (error) {
      console.error("Error resetting game:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">
        Turbo Clash Derby 🚗💥
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <div
          className="p-4 bg-white rounded shadow flex flex-col items-end"
          style={{ backgroundColor: turn === "A" ? "orange" : "white" }}
        >
          <h2 className="text-xl font-semibold">{carNameA}</h2>
          <p>Health: {carA.health}</p>
          <p>Attack: {carA.attack}</p>
          <p>Defense: {carA.defense}</p>
          {/* <button
            onClick={() => handleAction("Attack")}
            className="px-4 py-2 bg-green-500 text-white rounded m-2 mr-0"
            disabled={carA.health <= 0 || carB.health <= 0 || turn !== "A"}
          >
            {turn === "A" ? `${carNameA} Defends` : `${carNameA} Defends`}
            {turn === "A" ? "Attack" : "Defend"}
            Attack
          </button>
          <button
            onClick={() => handleAction("defend")}
            className="px-4 py-2 bg-green-500 text-white rounded m-2 mr-0"
            disabled={carA.health <= 0 || carB.health <= 0 || turn !== "A"}
          >
            {turn === "A" ? `${carNameA} Defends` : `${carNameA} Defends`}
            {turn === "A" ? "Attack" : "Defend"}
            Defend
          </button> */}
          <button
            onClick={() => handleAction(turn === "A" ? "attack" : "defend")}
            className="px-4 py-2 bg-green-500 text-white rounded m-2 mr-0"
            // disabled={carA.health <= 0 || carB.health <= 0 || turn !== "A"}
          >
            {/* {turn === "A" ? `${carNameA} Defends` : `${carNameA} Defends`} */}
            {/* {turn === "A" ? "Attack" : "Defend"} */}
            {turn === "A" ? "attack" : "defend"}
          </button>
        </div>

        <div
          className="p-4 bg-white rounded shadow flex flex-col items-start"
          style={{ backgroundColor: turn === "B" ? "orange" : "white" }}
        >
          <h2 className="text-xl font-semibold">{carNameB}</h2>
          <p>Health: {carB.health}</p>
          <p>Attack: {carB.attack}</p>
          <p>Defense: {carB.defense}</p>
          {/* <button
            onClick={() => handleAction("attack")}
            className="px-4 py-2 bg-blue-500 text-white rounded m-2 ml-0"
            disabled={carA.health <= 0 || carB.health <= 0}
          >
            {turn === "A" ? `${carNameB} Defends` : `${carNameB} Attacks`}
            {turn === "B" ? "Attack" : "Defend"}
            Attack
          </button>
          <button
            onClick={() => handleAction("Defend")}
            className="px-4 py-2 bg-blue-500 text-white rounded m-2 ml-0"
            disabled={carA.health <= 0 || carB.health <= 0}
          >
            {turn === "A" ? `${carNameB} Defends` : `${carNameB} Attacks`}
            {turn === "B" ? "Attack" : "Defend"}
            Defend
          </button> */}
          <button
            onClick={() => handleAction(turn === "B" ? "attack" : "defend")}
            className="px-4 py-2 bg-green-500 text-white rounded m-2 mr-0"
            // disabled={carA.health <= 0 || carB.health <= 0 || turn !== "A"}
          >
            {/* {turn === "A" ? `${carNameA} Defends` : `${carNameA} Defends`} */}
            {/* {turn === "A" ? "Attack" : "Defend"} */}
            {turn === "B" ? "attack" : "defend"}
          </button>
        </div>
      </div>
      {message && <p>{message}</p>}
      <div className="text-center my-4">
        {/* <button
          onClick={() => handleAction("attack")}
          className="px-4 py-2 bg-blue-500 text-white rounded m-2"
          disabled={carA.health <= 0 || carB.health <= 0}
        >
          {turn === "A" ? `${carNameA} Attacks` : `${carNameB} Attacks`}
        </button>
        <button
          onClick={() => handleAction("defend")}
          className="px-4 py-2 bg-green-500 text-white rounded m-2"
          disabled={carA.health <= 0 || carB.health <= 0}
        >
          {turn === "A" ? `${carNameB} Defends` : `${carNameA} Defends`}
        </button> */}
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-red-500 text-white rounded m-2 w-full"
        >
          Reset Game
        </button>
      </div>

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
