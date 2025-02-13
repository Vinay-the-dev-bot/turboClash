import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, cars } from "../Constants";
import { motion } from "framer-motion";
import CarCard from "./CarCard";
import WinnerModal from "./WinnerModal";
import { useDisclosure } from "@chakra-ui/react";

function Game() {
  const [carA, setCarA] = useState(
    { ...cars[0], maxHealth: cars[0].health } || {}
  );
  const [carB, setCarB] = useState(
    { ...cars[1], maxHealth: cars[1].health } || {}
  );
  const [battleLog, setBattleLog] = useState([]);
  const [damage, setDamage] = useState(0);
  const [message, setMessage] = useState("");
  const [attacking, setAttacking] = useState(cars[0]?.name);
  const [defending, setDefending] = useState(cars[1]?.name);
  const [hasAttacked, setHasAttacked] = useState(false);
  const [defendingScreen, setDefendingScreen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const AttackCar = async ({ attacker, defender }) => {
    if (hasAttacked) {
      alert(`Waiting for ${defending} to defend`);
      return;
    }
    try {
      const response = await axios.post(`${baseURL}/attack`, {
        attacker,
        defender
      });
      const { attackRoll, attackDamage } = response.data;

      setHasAttacked(true);
      setDamage(attackDamage);
      setMessage(`${attacker.name} attacked!`);
      setBattleLog((prev) => [
        ...prev,
        `🚗 ${attacker.name} rolled ${attackRoll} and dealt ${attackDamage} damage!`
      ]);
      setDefendingScreen(true);
    } catch (error) {
      console.error(`Error during attack:`, error);
    }
  };
  const carImages = cars.map((car) => ({ url: car.image, health: car.health }));
  const DefendCar = async ({ attacker, defender }) => {
    if (!hasAttacked) {
      alert(`Waiting for ${attacking} to attack`);
      return;
    }
    try {
      const response = await axios.post(`${baseURL}/defend`, {
        attacker,
        defender,
        damage
      });
      const { defender: updatedDefender } = response.data;

      setDefendingScreen(false);
      if (carA.name === updatedDefender.name) {
        setCarA(updatedDefender);
        setAttacking(carA.name);
        setDefending(carB.name);
      } else {
        setCarB(updatedDefender);
        setAttacking(carB.name);
        setDefending(carA.name);
      }
      setHasAttacked(false);
      setMessage(`${defender.name} defended successfully!`);
      // if (updatedDefender?.health <= 0) {
      //   alert(`${attacker.name} won!`);
      // }
    } catch (error) {
      console.error(`Error during defending:`, error);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (carA.health <= 0) {
        alert(`${carB.name} won!`);
        onOpen();
      } else if (carB.health <= 0) {
        alert(`${carA.name} won!`);
        onOpen();
      }
    }, 500);
  }, [hasAttacked]);
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-6 animate-pulse">
        🚗 Turbo Clash Derby 💥
      </h1>

      {/* <div className="flex w-full ">
        {carImages.map((car, key) => (
          <div className={`w-[${key % 2 === 0 ? car.health : car.health}px]`}>
            <img className={`max-w-[120px]`} src={car?.url} />
          </div>
        ))}
      </div> */}
      <div className="flex w-100% h-[100px] ">
        {carImages.map((car, key) => (
          <>
            <div
              className="relative"
              // style={{
              //   width:
              //     key === 0 ? `${(carA.health / car.health) * 100}%` : "100%"
              // }}
              style={{
                width:
                  key === 0
                    ? `${(carA.health / car.health) * 100}%`
                    : `${(carB.health / car.health) * 100}%`
              }}
            >
              <img
                className={`absolute !max-w-[120px] ${
                  key % 2 === 1 ? "some-class" : ""
                } ${key === 0 ? "right-0" : "left-0"}`}
                style={{ zIndex: key }}
                src={car?.url}
                alt="Car Image"
              />
            </div>
          </>
        ))}
      </div>
      <p className="text-center text-lg mb-4">
        {defendingScreen
          ? `${defending} is defending...`
          : `${attacking} is attacking!`}
      </p>
      <div className="grid grid-cols-2 gap-6">
        {[carA, carB].map((car, index) => (
          <CarCard
            defending={defending}
            attacking={attacking}
            AttackCar={AttackCar}
            DefendCar={DefendCar}
            index={index}
            car={car}
            carA={carA}
            carB={carB}
          />
        ))}
      </div>
      {message && (
        <motion.p
          className="text-center text-xl mt-4"
          animate={{ opacity: [0, 1] }}
        >
          {message}
        </motion.p>
      )}
      <div className="text-center my-6">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-700 text-black font-bold rounded-md transition"
          onClick={() => window.location.reload()}
        >
          Reset Game
        </motion.button>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg shadow-md max-w-3xl mx-auto"
      >
        <h2 className="text-xl font-bold">📜 Battle Log</h2>
        <div className="mt-2 h-40 overflow-y-auto">
          {battleLog.map((log, index) => (
            <motion.p
              key={index}
              animate={{ opacity: [0, 1] }}
              className="text-sm"
            >
              {log}
            </motion.p>
          ))}
        </div>
      </motion.div>

      <div className="hidden   grid-cols-2 gap-6">
        {[carA, carB].map((car, index) => (
          <motion.div
            key={car.name}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-lg shadow-lg text-center relative ${
              defending === car.name
                ? "bg-blue-700 animate-pulse"
                : attacking === car.name
                ? "bg-orange-700  "
                : "bg-gray-800"
            }`}
          >
            <div className="relative w-full h-6 bg-gray-300 rounded-md mt-2 overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all duration-500"
                style={{ width: `${(car.health / car.maxHealth) * 100}%` }}
              ></div>
            </div>
            <h2 className="text-2xl font-semibold">{car.name}</h2>
            <p className="text-lg">❤️ Health: {car.health}</p>
            <p className="text-lg">⚔️ Attack: {car.attack}</p>
            <p className="text-lg">🛡 Defense: {car.defense}</p>
            {attacking === car.name && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="!mt-4 !px-6 !py-2 !bg-green-500 !hover:bg-green-700 !text-white !rounded-md !transition"
                onClick={() => AttackCar({ attacker: car })}
                // disabled={hasAttacked}
              >
                Attack
              </motion.button>
            )}
            {defending === car.name && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md transition"
                onClick={() =>
                  DefendCar({
                    defender: car,
                    attacker: index === 0 ? carB : carA
                  })
                }
              >
                Defend
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Game;
