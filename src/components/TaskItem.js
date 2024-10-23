// src/components/TaskItem.js
import React, { useState, useEffect, useRef } from 'react';

const TaskItem = ({ task, deleteTask, toggleComplete }) => {
  const [timeLeft, setTimeLeft] = useState(task.timer || 0);
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null); // Store reference to the audio object

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      clearInterval(interval);
      setIsRunning(false);
      playBeep(); // Play the sound when timer ends
      toggleComplete(task.id); // Mark task as completed
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const playBeep = () => {
    audioRef.current = new Audio('/beep1.wav'); // Load the audio
    audioRef.current.play();
  };

  const stopBeep = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset the audio to the beginning
    }
  };

  const handleStartTimer = () => {
    if (timeLeft > 0) setIsRunning(true);
  };

  const handleStopSound = () => {
    stopBeep(); // Stop the beep sound
  };

  return (
    <li className={task.complete ? 'complete' : ''}>
      <span>{task.text}</span>

      <div>
        <input
          type="number"
          min="0"
          placeholder="Time (s)"
          value={timeLeft}
          onChange={(e) => setTimeLeft(e.target.value)}
          disabled={isRunning}
        />
        <button onClick={handleStartTimer} disabled={isRunning || timeLeft <= 0}>
          Start Timer
        </button>

        <button className="complete-btn" onClick={() => toggleComplete(task.id)}>
          {task.complete ? 'Undo' : 'Complete'}
        </button>

        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
          Delete
        </button>

        {/* Stop Sound Button */}
        <button className="stop-sound-btn" onClick={handleStopSound}>
          Stop Sound
        </button>

        {/* Display countdown */}
        <div>{isRunning && timeLeft > 0 ? `Time left: ${timeLeft}s` : null}</div>
      </div>
    </li>
  );
};

export default TaskItem;
