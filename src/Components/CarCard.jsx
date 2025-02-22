import { motion } from "framer-motion";

const CarCard = ({
  car,
  carA,
  carB,
  defending,
  attacking,
  AttackCar,
  DefendCar,
  index
}) => {
  console.log(car);
  return (
    <motion.div
      key={car.name}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`py-6 px-8 rounded-lg shadow-lg text-center relative ${
        defending === car.name
          ? "bg-blue-700 animate-pulse"
          : attacking === car.name
          ? "bg-orange-700  "
          : "bg-gray-800"
      }`}
    >
      <div className="relative w-full h-6 bg-gray-300 rounded-md mt-2 overflow-visible">
        <div
          className="h-full relative bg-green-500 rounded-md transition-all duration-500"
          style={{
            width: `${
              (car.health / car.maxHealth) * 100 < 0
                ? 0
                : (car.health / car.maxHealth) * 100
            }%`
          }}
        >
          <img
            className={`absolute !max-w-[60px] !min-w-[60px] !max-h-[25px] !min-h-[25px] top-0 right-[-30px]`}
            style={{ zIndex: index }}
            src={car?.image}
            alt="Car Image"
          />
        </div>
      </div>
      <h2 className="text-2xl font-semibold">{car.name}</h2>
      <p className="text-lg">❤️ Health: {car.health}</p>
      <p className="text-lg">⚔️ Attack: {car.attack}</p>
      <p className="text-lg">🛡 Defense: {car.defense}</p>
      {attacking === car.name && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          //   className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md transition"
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
          className="!mt-4 !px-6 !py-2 !bg-red-500 !hover:bg-red-700 !text-white !rounded-md !transition"
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
  );
};

export default CarCard;
