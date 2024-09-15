import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import { Plus, Search, ChevronDown, MoreHorizontal, Home, Dumbbell, User, Clock, AlignLeft, Save, Trash2, Play, Square, Minus } from 'lucide-react';

// Mock data for exercises (unchanged)
const mockExercises = [
  { id: 1, name: 'Bench Press (Barbell)', category: 'Chest' },
  { id: 2, name: 'Squat (Barbell)', category: 'Legs' },
  { id: 3, name: 'Deadlift (Barbell)', category: 'Back' },
  { id: 4, name: 'Shoulder Press (Dumbbell)', category: 'Shoulders' },
  { id: 5, name: 'Bicep Curl (Dumbbell)', category: 'Arms' },
  { id: 6, name: 'Tricep Pushdown (Cable)', category: 'Arms' },
  { id: 7, name: 'Lat Pulldown (Cable)', category: 'Back' },
  { id: 8, name: 'Leg Press (Machine)', category: 'Legs' },
];

// Initial dummy routines with days (unchanged)
const initialRoutines = [
  {
    id: 1,
    name: 'Full Body Split',
    days: [
      { id: 1, name: 'Day 1', exercises: [1, 2, 5] },
      { id: 2, name: 'Day 2', exercises: [3, 4, 6] },
    ]
  },
  {
    id: 2,
    name: 'Upper Lower Split',
    days: [
      { id: 1, name: 'Upper Body', exercises: [1, 4, 5, 6] },
      { id: 2, name: 'Lower Body', exercises: [2, 8] },
    ]
  },
];



const ExerciseList = () => {
  const navigate = useNavigate();
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    navigate('/log-workout', { state: { exercise } });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Choose Exercise</h1>
      {mockExercises.map((exercise) => (
        <button
          key={exercise.id}
          className="w-full text-left bg-white rounded-lg p-4 mb-2 shadow flex items-center"
          onClick={() => handleExerciseSelect(exercise)}
        >
          <Dumbbell className="mr-3" />
          <div>
            <p className="font-semibold">{exercise.name}</p>
            <p className="text-sm text-gray-500">{exercise.category}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

const LogWorkout = () => {
  const navigate = useNavigate();
  const [workoutData, setWorkoutData] = useState({
    duration: '17s',
    volume: '0 kg',
    sets: 0,
  });

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-blue-500 flex items-center">
          <ChevronDown size={20} />
          Log Workout
        </button>
        <div className="flex items-center">
          <Clock className="mr-2" />
          <button className="bg-blue-500 text-white px-4 py-1 rounded-full ml-2">
            Finish
          </button>
        </div>
      </header>

      <div className="flex justify-between mb-4 text-center">
        <div>
          <p className="text-gray-500">Duration</p>
          <p className="text-blue-500 font-bold">{workoutData.duration}</p>
        </div>
        <div>
          <p className="text-gray-500">Volume</p>
          <p className="font-bold">{workoutData.volume}</p>
        </div>
        <div>
          <p className="text-gray-500">Sets</p>
          <p className="font-bold">{workoutData.sets}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img src="/api/placeholder/24/24" alt="Exercise" className="mr-2" />
            <h2 className="text-lg font-semibold text-blue-500">Bench Press (Barbell)</h2>
          </div>
          <MoreHorizontal />
        </div>
        <input
          type="text"
          placeholder="Add notes here..."
          className="w-full bg-gray-100 p-2 rounded mb-2"
        />
        <div className="flex items-center text-blue-500 mb-4">
          <Clock size={16} className="mr-1" />
          <span>Rest Timer: OFF</span>
        </div>
        <div className="grid grid-cols-4 gap-4 text-center mb-4">
          <div>
            <p className="text-gray-500">SET</p>
            <p className="font-bold">1</p>
          </div>
          <div>
            <p className="text-gray-500">PREVIOUS</p>
            <p>-</p>
          </div>
          <div>
            <p className="text-gray-500">KG</p>
            <input type="number" className="w-full text-center border rounded" defaultValue={0} />
          </div>
          <div>
            <p className="text-gray-500">REPS</p>
            <input type="number" className="w-full text-center border rounded" defaultValue={0} />
          </div>
        </div>
        <button className="w-full bg-gray-200 py-2 rounded-lg flex items-center justify-center">
          <Plus size={20} className="mr-2" />
          Add Set
        </button>
      </div>
        <button  onClick={() => navigate('/exercises', {})} className="w-full bg-blue-500 text-white py-3 rounded-lg mb-4">
          <Plus size={20} className="inline mr-2" />
          Add Exercise
        </button>

      <div className="grid grid-cols-2 gap-4">
        <button className="bg-gray-200 py-2 rounded-lg">Settings</button>
        <button className="bg-gray-200 py-2 rounded-lg text-red-500">Discard Workout</button>
      </div>
    </div>
  );
};

// New component for creating a routine
// New component for creating a routine
const NewRoutine = ({ addRoutine }) => {
  const navigate = useNavigate();
  const [routineName, setRoutineName] = useState('');
  const [days, setDays] = useState([{ id: 1, name: 'Day 1', exercises: [] }]);

  const addDay = () => {
    const newDay = {
      id: days.length + 1,
      name: `Day ${days.length + 1}`,
      exercises: []
    };
    setDays([...days, newDay]);
  };

  const removeDay = (dayId) => {
    setDays(days.filter(day => day.id !== dayId));
  };

  const updateDayName = (dayId, newName) => {
    setDays(days.map(day => 
      day.id === dayId ? { ...day, name: newName } : day
    ));
  };

  const toggleExercise = (dayId, exerciseId) => {
    setDays(days.map(day => {
      if (day.id === dayId) {
        const updatedExercises = day.exercises.includes(exerciseId)
          ? day.exercises.filter(id => id !== exerciseId)
          : [...day.exercises, exerciseId];
        return { ...day, exercises: updatedExercises };
      }
      return day;
    }));
  };

  const handleSaveRoutine = () => {
    if (routineName.trim() === '') {
      alert('Please enter a routine name');
      return;
    }
    const newRoutine = {
      id: Date.now(),
      name: routineName,
      days: days
    };
    addRoutine(newRoutine);
    navigate('/');
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <button onClick={() => navigate('/')} className="text-blue-500 flex items-center">
          <ChevronDown size={20} />
          New Routine
        </button>
        <button onClick={handleSaveRoutine} className="bg-blue-500 text-white px-4 py-1 rounded-full flex items-center">
          <Save size={20} className="mr-2" />
          Save
        </button>
      </header>

      <input
        type="text"
        placeholder="Routine Name"
        value={routineName}
        onChange={(e) => setRoutineName(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {days.map((day, index) => (
        <div key={day.id} className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <input
              type="text"
              value={day.name}
              onChange={(e) => updateDayName(day.id, e.target.value)}
              className="font-semibold text-lg"
            />
            {days.length > 1 && (
              <button onClick={() => removeDay(day.id)} className="text-red-500">
                <Trash2 size={20} />
              </button>
            )}
          </div>
          {mockExercises.map((exercise) => (
            <div
              key={exercise.id}
              className={`flex items-center p-2 mb-2 rounded ${
                day.exercises.includes(exercise.id) ? 'bg-blue-100' : 'bg-gray-100'
              }`}
              onClick={() => toggleExercise(day.id, exercise.id)}
            >
              <input
                type="checkbox"
                checked={day.exercises.includes(exercise.id)}
                onChange={() => {}}
                className="mr-2"
              />
              <div>
                <p className="font-semibold">{exercise.name}</p>
                <p className="text-sm text-gray-500">{exercise.category}</p>
              </div>
            </div>
          ))}
        </div>
      ))}

      <button 
        onClick={addDay} 
        className="w-full bg-gray-200 py-3 px-4 rounded-lg flex items-center justify-center"
      >
        <Plus size={20} className="mr-2" />
        Add Day
      </button>
    </div>
  );
};

// New component for viewing a routine
const ViewRoutine = ({ routines }) => {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const routine = routines.find(r => r.id === parseInt(routineId));

  if (!routine) {
    return <div>Routine not found</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{routine.name}</h2>
      {routine.days.map(day => (
        <div key={day.id} className="mb-4 bg-white rounded-lg p-4 shadow">
          <h3 className="text-xl font-semibold mb-2">{day.name}</h3>
          <ul>
            {day.exercises.map(exId => {
              const exercise = mockExercises.find(e => e.id === exId);
              return (
                <li key={exId} className="mb-2">
                  {exercise ? exercise.name : 'Unknown Exercise'}
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => navigate(`/start-workout/${routineId}/${day.id}`)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center justify-center"
          >
            <Play size={20} className="mr-2" />
            Start Workout
          </button>
        </div>
      ))}
    </div>
  );
};

// Updated ExecuteWorkout component with dynamic set addition
const ExecuteWorkout = ({ routines }) => {
  const { routineId, dayId } = useParams();
  const navigate = useNavigate();
  const routine = routines.find(r => r.id === parseInt(routineId));
  const day = routine?.days.find(d => d.id === parseInt(dayId));
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [workoutData, setWorkoutData] = useState({});
  const [restTimers, setRestTimers] = useState({});

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    } else if (!isActive && startTime !== null) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, startTime]);

  useEffect(() => {
    if (day) {
      const initialData = {};
      const initialTimers = {};
      day.exercises.forEach(exId => {
        initialData[exId] = [{ reps: '', weight: '' }];
        initialTimers[exId] = { time: 60, isActive: false };
      });
      setWorkoutData(initialData);
      setRestTimers(initialTimers);
    }
  }, [day]);

  const startWorkout = () => {
    setStartTime(Date.now());
    setIsActive(true);
  };

  const endWorkout = () => {
    setIsActive(false);
    console.log('Workout completed:', {
      routine: routine.name,
      day: day.name,
      duration: formatTime(elapsedTime),
      exercises: workoutData
    });
    navigate('/');
  };

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / 1000 / 3600) % 24);
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };

  const updateSetData = (exerciseId, setIndex, field, value) => {
    setWorkoutData(prev => ({
      ...prev,
      [exerciseId]: prev[exerciseId].map((set, index) => 
        index === setIndex ? { ...set, [field]: value } : set
      )
    }));
  };

  const addSet = (exerciseId) => {
    setWorkoutData(prev => ({
      ...prev,
      [exerciseId]: [...prev[exerciseId], { reps: '', weight: '' }]
    }));
  };

  const removeSet = (exerciseId, setIndex) => {
    setWorkoutData(prev => ({
      ...prev,
      [exerciseId]: prev[exerciseId].filter((_, index) => index !== setIndex)
    }));
  };

  const toggleRestTimer = (exerciseId) => {
    setRestTimers(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        isActive: !prev[exerciseId].isActive
      }
    }));
  };

  const updateRestTime = (exerciseId, time) => {
    setRestTimers(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        time: Math.max(0, time)
      }
    }));
  };

  useEffect(() => {
    const intervals = Object.keys(restTimers).map(exId => {
      if (restTimers[exId].isActive && restTimers[exId].time > 0) {
        return setInterval(() => {
          setRestTimers(prev => ({
            ...prev,
            [exId]: {
              ...prev[exId],
              time: prev[exId].time - 1
            }
          }));
        }, 1000);
      }
      return null;
    });

    return () => intervals.forEach(interval => interval && clearInterval(interval));
  }, [restTimers]);

  if (!routine || !day) {
    return <div>Workout not found</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{routine.name} - {day.name}</h2>
      <div className="mb-4 text-xl font-semibold">
        Time: {formatTime(elapsedTime)}
      </div>
      {!isActive ? (
        <button
          onClick={startWorkout}
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded-full flex items-center justify-center"
        >
          <Play size={20} className="mr-2" />
          Start Workout
        </button>
      ) : (
        <button
          onClick={endWorkout}
          className="mb-4 bg-red-500 text-white px-4 py-2 rounded-full flex items-center justify-center"
        >
          <Square size={20} className="mr-2" />
          End Workout
        </button>
      )}
      {day.exercises.map(exId => {
        const exercise = mockExercises.find(e => e.id === exId);
        return (
          <div key={exId} className="mb-6 bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-2">{exercise ? exercise.name : 'Unknown Exercise'}</h3>
            {workoutData[exId]?.map((set, setIndex) => (
              <div key={setIndex} className="grid grid-cols-4 gap-2 mb-2 items-center">
                <div className="flex items-center">
                  <span className="mr-2">Set {setIndex + 1}</span>
                </div>
                <input
                  type="number"
                  placeholder="Reps"
                  value={set.reps}
                  className="p-2 border rounded"
                  onChange={(e) => updateSetData(exId, setIndex, 'reps', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Weight"
                  value={set.weight}
                  className="p-2 border rounded"
                  onChange={(e) => updateSetData(exId, setIndex, 'weight', e.target.value)}
                />
                <button
                  onClick={() => removeSet(exId, setIndex)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  <Minus size={20} />
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center mt-2">
              <button
                onClick={() => addSet(exId)}
                className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center justify-center"
              >
                <Plus size={20} className="mr-2" />
                Add Set
              </button>
              <div className="flex items-center">
                <input
                  type="number"
                  value={restTimers[exId]?.time}
                  onChange={(e) => updateRestTime(exId, parseInt(e.target.value))}
                  className="w-16 p-2 border rounded mr-2"
                />
                <button
                  onClick={() => toggleRestTimer(exId)}
                  className={`${
                    restTimers[exId]?.isActive ? 'bg-red-500' : 'bg-green-500'
                  } text-white px-4 py-2 rounded-full flex items-center justify-center`}
                >
                  <Clock size={20} className="mr-2" />
                  {restTimers[exId]?.isActive ? 'Stop' : 'Start'} Rest
                </button>
              </div>
            </div>
            {restTimers[exId]?.isActive && (
              <div className="mt-2 text-center font-bold text-xl">
                Rest Time: {formatTime(restTimers[exId].time * 1000)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};


const WorkoutApp = () => {
  const [routines, setRoutines] = useState(initialRoutines);

  const addRoutine = (newRoutine) => {
    setRoutines(prevRoutines => [...prevRoutines, newRoutine]);
  };

  return (
    <div className="font-sans max-w-md mx-auto bg-gray-50 h-screen flex flex-col">
      <main className="flex-grow overflow-auto">
        <Routes>
          <Route path="/" element={
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Workout</h1>
                <span className="text-yellow-500 font-bold">PRO</span>
              </div>
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Quick Start</h2>
                <Link to="/log-workout" className="w-full bg-gray-200 py-3 px-4 rounded-lg flex items-center">
                  <Plus size={20} className="mr-2" />
                  Start Empty Workout
                </Link>
              </section>
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Routines</h2>
                <Link to="/new-routine" className="w-full bg-gray-200 py-3 px-4 rounded-lg flex items-center mb-4">
                  <Plus size={20} className="mr-2" />
                  New Routine
                </Link>
                {routines.map(routine => (
                  <Link key={routine.id} to={`/routine/${routine.id}`} className="block">
                    <div className="bg-white rounded-lg p-4 shadow mb-2">
                      <h3 className="font-semibold">{routine.name}</h3>
                      <p className="text-sm text-gray-500">{routine.days.length} days</p>
                    </div>
                  </Link>
                ))}
              </section>
            </div>
          } />
          <Route path="/exercises" element={<ExerciseList />} />
          <Route path="/log-workout" element={<LogWorkout />} />
          <Route path="/new-routine" element={<NewRoutine addRoutine={addRoutine} />} />
          <Route path="/routine/:routineId" element={<ViewRoutine routines={routines} />} />
          <Route path="/start-workout/:routineId/:dayId" element={<ExecuteWorkout routines={routines} />} />
        </Routes>
      </main>

      <footer className="border-t flex justify-around py-2">
        <Link to="/" className="flex flex-col items-center text-blue-500">
          <Home size={24} />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/exercises" className="flex flex-col items-center">
          <Dumbbell size={24} />
          <span className="text-xs">Workout</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center">
          <User size={24} />
          <span className="text-xs">Profile</span>
        </Link>
      </footer>
    </div>
  );
};

const App = () => (
  <Router>
    <WorkoutApp />
  </Router>
);

export default App;