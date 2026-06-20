import PropTypes from "prop-types";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

const GoalsInput = ({ setShowGoalsInput }) => {
  const [goalsText, setGoalsText] = useState(() => {
    const stored = localStorage.getItem("goals");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.join("\n");
        }
      } catch (e) {
        // ignore
      }
    }
    return "";
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleSetGoals = () => {
    const pointsArray = goalsText
      .split("\n")
      .filter((point) => point.trim() !== "");

    if (pointsArray.length === 0) return;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 75);

    localStorage.setItem("startDate", startDate.toISOString());
    localStorage.setItem("endDate", endDate.toISOString());
    localStorage.setItem("goals", JSON.stringify(pointsArray));
    localStorage.setItem("lastCompletedDate", startDate.toISOString());
    localStorage.setItem("isDayCompleted", "false");
    localStorage.setItem("daysCompleted", "0");

    setShowConfirmationModal(false);
    setShowGoalsInput(false);

    window.location.reload();
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 transition-all hover:shadow-2xl">
        <h2 className="text-2xl font-extrabold text-primary mb-2">
          Define Your 75-Day Challenge
        </h2>
        <p className="text-secondary text-sm mb-6">
          Set the daily habits you commit to completing every day. Remember, if you miss a single task on any day, you must start back at Day 1!
        </p>

        {/* Examples section */}
        <div className="bg-primary/5 rounded-xl p-4 mb-6 border border-primary/10">
          <h3 className="text-xs font-bold text-primary tracking-wider uppercase mb-2">
            Example Challenge Goals:
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-secondary font-medium">
            <li className="flex items-center gap-2">
              <span className="text-sm">🏋️‍♂️</span> 45-minute indoor workout
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sm">🏃‍♂️</span> 45-minute outdoor workout
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sm">💧</span> Drink 4 liters of water
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sm">📖</span> Read 10 pages of non-fiction
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sm">🍎</span> Stick to a clean diet
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sm">📸</span> Take a daily progress photo
            </li>
          </ul>
        </div>

        <div className="relative mb-6">
          <label htmlFor="goals-input" className="block text-xs font-bold text-primary tracking-wider uppercase mb-2">
            Enter Your Goals (One per line):
          </label>
          <textarea
            id="goals-input"
            rows="5"
            className="block w-full p-4 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gray-50 text-primary transition-all font-medium placeholder-gray-400"
            placeholder="E.g. Drink 4L of Water&#10;Read 10 pages of non-fiction&#10;Workout for 45 minutes"
            value={goalsText}
            onChange={(e) => {
              setGoalsText(e.target.value);
            }}
          ></textarea>
          <div className="absolute bottom-3 right-3 text-gray-400 text-xs font-medium bg-white px-2 py-0.5 rounded border border-gray-100 shadow-sm pointer-events-none">
            Press Enter for new line
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-secondary font-semibold transition-all duration-200"
            onClick={() => {
              setShowGoalsInput(false);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-200 shadow-md shadow-primary/20 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
            onClick={() => {
              setShowConfirmationModal(true);
            }}
            disabled={goalsText.split("\n").filter((p) => p.trim() !== "").length === 0}
          >
            Start Challenge 🚀
          </button>
        </div>
      </div>

      {/* Show Confirmation Modal */}
      {showConfirmationModal && (
        <ConfirmationModal
          setShowModal={setShowConfirmationModal}
          onConfirm={handleSetGoals}
          goals={goalsText}
        />
      )}
    </div>
  );
};

GoalsInput.propTypes = {
  setShowGoalsInput: PropTypes.func.isRequired,
};

export default GoalsInput;
