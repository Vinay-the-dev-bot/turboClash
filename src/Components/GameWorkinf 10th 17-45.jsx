import React, { useState } from "react";
import axios from "axios";
import { ATTACK, baseURL, cars, DEFEND } from "../Constants";

function Game() {
  const [carNameA, setCarNameA] = useState(cars[0]?.name || "Car 1");
  const [carNameB, setCarNameB] = useState(cars[1]?.name || "Car 2");
  const [carA, setCarA] = useState(cars[0] || {});
  const [carB, setCarB] = useState(cars[1] || {});
  const [turn, setTurn] = useState(cars[0]?.name);
  const [battleLog, setBattleLog] = useState([]);
  const [damage, setDamage] = useState(0);
  const [message, setMessage] = useState("");
  const updateHealth = ({
    attacker,
    attackDamage,
    defender,
    defenderHealth,
    type
  }) => {
    console.log({ attacker, attackDamage, defender, defenderHealth, type });
    console.log({ type });
    if (type === ATTACK) return;
    if (attacker === cars[0]?.name) {
      setCarB((prev) => ({ ...prev, health: defenderHealth }));
    } else {
      setCarA((prev) => ({ ...prev, health: defenderHealth }));
    }
  };

  const handleAction = async ({ turn, type }) => {
    const attacker = turn === cars[0]?.name ? carA : carB;
    const defender = turn === cars[0]?.name ? carB : carA;
    if (type === ATTACK) {
      try {
        const response = await axios.post(`${baseURL}/${type}`, {
          attacker,
          defender
        });
        const { attackRoll, attackDamage } = response.data;

        // updateHealth({
        //   turn,
        //   attackDamage,
        //   defender,
        //   defenderHealth,
        //   type
        // });
        console.log({ attackRoll, attackDamage });
        setDamage(attackDamage);
        setMessage(`${turn} attacked`);
        setBattleLog((prev) => [
          ...prev,
          `Car ${turn} attacked with a roll of ${attackRoll}, dealing ${attackDamage} damage!`
        ]);
      } catch (error) {
        console.error(`Error during ${type}:`, error);
      }
    } else {
      try {
        const response = await axios.post(`${baseURL}/${type}`, {
          attacker,
          defender,
          damage
        });
        const { attacker: updatedAttacker, defender: updatedDefender } =
          response.data;
        console.log({ attacker, defender, updatedAttacker, updatedDefender });

        setTurn((prev) =>
          prev === cars[0]?.name ? cars[1]?.name : cars[0]?.name
        );
        setMessage(`${turn} defended successfully`);
      } catch (error) {
        console.error(`Error during ${type}:`, error);
      }
    }
  };

  const resetGame = async () => {
    try {
      const response = await axios.post(`${baseURL}/reset`);
      setCarA(response.data.carA);
      setCarB(response.data.carB);
      setBattleLog([]);
      setTurn(cars[0]?.name);
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
          style={{
            backgroundColor: turn === cars[0]?.name ? "orange" : "white"
          }}
        >
          <h2 className="text-xl font-semibold">{carNameA}</h2>
          <p>Health: {carA.health}</p>
          <p>Attack: {carA.attack}</p>
          <p>Defense: {carA.defense}</p>
          {/* <button
            onClick={() => handleAction("Attack")}
            className="px-4 py-2 bg-green-500 text-white rounded m-2 mr-0"
            disabled={carA.health <= 0 || carB.health <= 0 || turn !== cars[0]?.name}
          >
            {turn === cars[0]?.name ? `${carNameA} Defends` : `${carNameA} Defends`}
            {turn === cars[0]?.name ? "Attack" : "Defend"}
            Attack
          </button>
          <button
            onClick={() => handleAction("defend")}
            className="px-4 py-2 bg-green-500 text-white rounded m-2 mr-0"
            disabled={carA.health <= 0 || carB.health <= 0 || turn !== cars[0]?.name}
          >
            {turn === cars[0]?.name ? `${carNameA} Defends` : `${carNameA} Defends`}
            {turn === cars[0]?.name ? "Attack" : "Defend"}
            Defend
          </button> */}
          <button
            onClick={() =>
              handleAction({
                turn: cars[0]?.name,
                type: turn === cars[0]?.name ? ATTACK : DEFEND
              })
            }
            className="px-4 py-2 bg-green-500 text-white rounded m-2 mr-0"
            // disabled={carA.health <= 0 || carB.health <= 0 || turn !== cars[0]?.name}
          >
            {/* {turn === cars[0]?.name ? `${carNameA} Defends` : `${carNameA} Defends`} */}
            {/* {turn === cars[0]?.name ? "Attack" : "Defend"} */}
            {turn === cars[0]?.name ? ATTACK : DEFEND}
          </button>
        </div>

        <div
          className="p-4 bg-white rounded shadow flex flex-col items-start"
          style={{
            backgroundColor: turn === cars[1]?.name ? "orange" : "white"
          }}
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
            {turn === cars[0]?.name ? `${carNameB} Defends` : `${carNameB} Attacks`}
            {turn === cars[1]?.name ? "Attack" : "Defend"}
            Attack
          </button>
          <button
            onClick={() => handleAction("Defend")}
            className="px-4 py-2 bg-blue-500 text-white rounded m-2 ml-0"
            disabled={carA.health <= 0 || carB.health <= 0}
          >
            {turn === cars[0]?.name ? `${carNameB} Defends` : `${carNameB} Attacks`}
            {turn === cars[1]?.name ? "Attack" : "Defend"}
            Defend
          </button> */}
          <button
            // onClick={() => handleAction(turn === cars[1]?.name ? "attack" : "defend")}
            onClick={() =>
              handleAction({
                turn: cars[1]?.name,
                type: turn === cars[1]?.name ? ATTACK : DEFEND
              })
            }
            className="px-4 py-2 bg-green-500 text-white rounded m-2 mr-0"
            // disabled={carA.health <= 0 || carB.health <= 0 || turn !== cars[0]?.name}
          >
            {/* {turn === cars[0]?.name ? `${carNameA} Defends` : `${carNameA} Defends`} */}
            {/* {turn === cars[0]?.name ? "Attack" : "Defend"} */}
            {turn === cars[1]?.name ? ATTACK : DEFEND}
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
          {turn === cars[0]?.name ? `${carNameA} Attacks` : `${carNameB} Attacks`}
        </button>
        <button
          onClick={() => handleAction("defend")}
          className="px-4 py-2 bg-green-500 text-white rounded m-2"
          disabled={carA.health <= 0 || carB.health <= 0}
        >
          {turn === cars[0]?.name ? `${carNameB} Defends` : `${carNameA} Defends`}
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
