import { useState } from "react";

import headsImage from "../assets/heads.png";
import tailsImage from "../assets/tails.png";

const Toss = () => {
  const [angle, setAngle] = useState(0);
  const [outcome, setOutcome] = useState(null);
  const [userSelection, setUserSelection] = useState(null);
  const [message, setMessage] = useState("");

  const flipCoin = () => {
    // Reset state for the next round
    setOutcome(null);
    setMessage("");

    const result = Math.random() > 0.5 ? "heads" : "tails";
    setOutcome(result);
    setAngle((prev) => prev + (result === "heads" ? 180 : 360));

    if (userSelection) {
      if (result === userSelection) {
        setMessage("You won!");
      } else {
        setMessage("You lost!");
      }
    }
  };

  return (
    <div className="flex">
      admin
      <main className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Toss</h1>
        <section className="mb-4">
          <button
            className={`px-4 py-2 mr-2 rounded ${
              userSelection === "heads" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setUserSelection("heads")}
          >
            Heads
          </button>
          <button
            className={`px-4 py-2 rounded ${
              userSelection === "tails" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setUserSelection("tails")}
          >
            Tails
          </button>
        </section>
        <section>
          <article
            className="relative m-8 w-60 h-60 cursor-pointer"
            onClick={flipCoin}
            style={{
              transform: `rotateY(${angle}deg)`,
              transformStyle: "preserve-3d",
              transition: "all 0.5s",
            }}
          >
            <div
              className="absolute w-full h-full grid place-items-center rounded-full bg-no-repeat bg-contain"
              style={{
                backfaceVisibility: "hidden",
                backgroundImage: `url(${headsImage})`,
                filter: "drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.521))",
              }}
            ></div>
            <div
              className="absolute w-full h-full grid place-items-center rounded-full bg-no-repeat bg-contain"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(-180deg)",
                backgroundImage: `url(${tailsImage})`,
                filter: "drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.521))",
              }}
            ></div>
          </article>
        </section>
        {outcome && (
          <p className="text-xl font-bold text-white">
            The coin shows: {outcome.charAt(0).toUpperCase() + outcome.slice(1)}
          </p>
        )}
        {message && <p className="text-xl font-bold text-white">{message}</p>}
      </main>
    </div>
  );
};

export default Toss;
