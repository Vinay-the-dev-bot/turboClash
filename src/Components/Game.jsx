import React, { useState } from "react";
import axios from "axios";
import { ATTACK, baseURL, cars, DEFEND } from "../Constants";

function Game() {
  const [carA, setCarA] = useState({ ...cars[0] } || {});
  const [carB, setCarB] = useState({ ...cars[1] } || {});
  const [battleLog, setBattleLog] = useState([]);
  const [damage, setDamage] = useState(0);
  const [message, setMessage] = useState("");
  const [attacking, setAttacking] = useState(cars[0]?.name);
  const [defending, setDefending] = useState(cars[1]?.name);
  const [hasAttacked, setHasAttacked] = useState(false);
  const [defendingScreen, setDefendingScreen] = useState(false);
  const AttackCar = async ({ attacker, defender }) => {
    if (hasAttacked) {
      alert(`Wating for ${defending} to defend`);
      return;
    }
    try {
      const response = await axios.post(`${baseURL}/attack`, {
        attacker,
        defender
      });
      const {
        attacker: currentAttacker,
        attackRoll,
        attackDamage
      } = response.data;

      setHasAttacked(true);
      setDamage(attackDamage);
      setMessage(`${attacker.name} attacked`);
      setBattleLog((prev) => [
        ...prev,
        `Car ${attacker.name} attacked with a roll of ${attackRoll}, dealing ${attackDamage} damage!`
      ]);
      setDefendingScreen(true);
    } catch (error) {
      console.error(`Error during attack:`, error);
    }
  };
  const DefendCar = async ({ attacker, defender }) => {
    if (!hasAttacked) {
      alert(`Wating for ${attacking} to attack`);
      return;
    }
    try {
      const response = await axios.post(`${baseURL}/defend`, {
        attacker,
        defender,
        damage
      });
      const { defender: updatedDefender, attacker: updatedAttacker } =
        response.data;
      setDefendingScreen(false);
      if (updatedDefender?.health < 0)
        alert(`${JSON.stringify(updatedAttacker)} won`);
      if (carA.name === updatedDefender.name) {
        setCarA({ ...updatedDefender });
        setAttacking(carA.name);
        setDefending(carB.name);
      } else {
        setCarB({ ...updatedDefender });
        setAttacking(carB.name);
        setDefending(carA.name);
      }
      setHasAttacked(false);
      setMessage(`${defender.name} defended successfully`);
    } catch (error) {
      console.error(`Error during defending:`, error);
    }
  };
  const resetGame = async () => {
    try {
      const response = await axios.post(`${baseURL}/reset`);
      setCarA(response.data.carA);
      setCarB(response.data.carB);
      setBattleLog([]);
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
      {defendingScreen ? (
        <p>{`${defending} Defending`}</p>
      ) : (
        <p>{`${attacking} attacking`}</p>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div
          className="p-4 bg-white rounded shadow flex flex-col items-end"
          //   style={{
          //     backgroundColor:
          //       attacking === carA.name
          //         ? hasAttacked
          //           ? "white"
          //           : "orange"
          //         : defending === carA.name
          //         ? "blue"
          //         : "white"
          //   }}
          style={{
            backgroundColor: hasAttacked
              ? "white"
              : defending === carA.name
              ? "blue"
              : "orange"
          }}
        >
          <h2 className="text-xl font-semibold">{carA.name}</h2>
          <p>Health: {carA.health}</p>
          <p>Attack: {carA.attack}</p>
          <p>Defense: {carA.defense}</p>
          {attacking === carA.name && (
            <button
              style={{ opacity: hasAttacked ? 0.5 : 1 }}
              //   disabled={hasAttacked}
              onClick={() => {
                AttackCar({ attacker: carA });
              }}
              className="px-4 py-2 bg-green-500 text-white border rounded m-2 mr-0"
            >
              Attack
            </button>
          )}
          {defending === carA.name && (
            <button
              onClick={() => {
                DefendCar({ defender: carA, attacker: carB });
              }}
              className="px-4 py-2 bg-green-500 text-white border rounded m-2 mr-0"
            >
              Defend
            </button>
          )}
        </div>

        <div
          className="p-4 bg-white rounded shadow flex flex-col items-start"
          //   style={{
          //     backgroundColor:
          //       attacking === carB.name
          //         ? hasAttacked
          //           ? "white"
          //           : "orange"
          //         : defending === carB.name
          //         ? "blue"
          //         : "white"
          //   }}
          style={{
            backgroundColor: hasAttacked
              ? "white"
              : defending === carB.name
              ? "blue"
              : "orange"
          }}
        >
          <h2 className="text-xl font-semibold">{carB.name}</h2>
          <p>Health: {carB.health}</p>
          <p>Attack: {carB.attack}</p>
          <p>Defense: {carB.defense}</p>
          {attacking === carB.name && (
            <button
              style={{ opacity: hasAttacked ? 0.5 : 1 }}
              onClick={() => {
                AttackCar({ attacker: carB });
              }}
              className="px-4 py-2 bg-green-500 text-white border rounded m-2 mr-0"
            >
              Attack
            </button>
          )}
          {defending === carB.name && (
            <button
              onClick={() => {
                DefendCar({ defender: carB, attacker: carA });
              }}
              className="px-4 py-2 bg-green-500 text-white border rounded m-2 mr-0"
            >
              Defend
            </button>
          )}
        </div>
      </div>
      {message && <p>{message}</p>}
      <div className="text-center my-4">
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
