import FlatBed from "./assets/FlatBed.png";
import OffRoad from "./assets/OffRoad.png";
import Pickup from "./assets/Pickup.png";
import SportsCar from "./assets/SportsCar.png";
import Truck from "./assets/Truck.png";
import Wagon from "./assets/Wagon.png";
export const baseURL = "http://localhost:3000";
export const cars = [
  { name: "FlatBed", health: 50, attack: 10, defense: 5, image: FlatBed },
  {
    name: "Landrover Defender",
    health: 100,
    attack: 5,
    defense: 10,
    image: OffRoad
  },
  { name: "Ford F150", health: 100, attack: 5, defense: 10, image: Pickup },
  {
    name: "Ferrari-F40",
    health: 100,
    attack: 5,
    defense: 10,
    image: SportsCar
  },
  { name: "UniMog", health: 100, attack: 5, defense: 10, image: Truck },
  { name: "Audi RS6", health: 100, attack: 5, defense: 10, image: Wagon }
];
export const ATTACK = "Attack";
export const DEFEND = "Defend";
