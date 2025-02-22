<div className="gap-10 hidden text-center my-4">
  <div className="flex w-fit m-auto">
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold">{carNameA}</h2>
      <button
        onClick={rollDice}
        className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        disabled={carA.health <= 0 || carB.health <= 0}
      >
        {turn === "A" ? "Attack" : "Defend"}
      </button>
    </div>
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold">{carNameB}</h2>
      <button
        onClick={rollDice}
        className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        disabled={carA.health <= 0 || carB.health <= 0}
      >
        {turn === "B" ? "Attack" : "Defend"}
      </button>
    </div>
  </div>
</div>;
