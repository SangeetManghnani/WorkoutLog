// Workout.js
import React from "react";

const Workout = () => {
  return (
    <div>
      <h2>Workout Routines</h2>
      <div className="routine">
        <h3>4 Push</h3>
        <p>Squat (Barbell), Incline Bench Press (Barbell), Bench Press (Dumbbell), Standing...</p>
        <button>Start Routine</button>
      </div>
      <div className="routine">
        <h3>3 Pull</h3>
        <p>Chin Up, Deadlift (Barbell), Lat Pulldown...</p>
        <button>Start Routine</button>
      </div>
    </div>
  );
};

export default Workout;
