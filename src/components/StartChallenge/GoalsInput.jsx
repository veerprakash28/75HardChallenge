import PropTypes from "prop-types";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

const GoalsInput = ({ setShowGoalsInput }) => {
  const [goalsText, setGoalsText] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleSetGoals = () => {
    // Split the goalsText by line breaks to create an array of points
    const pointsArray = goalsText
      .split("\n")
      .filter((point) => point.trim() !== "");

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 75); // Add 75 days to the current date

    // Store the points, start date, and end date in localStorage
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
    localStorage.setItem("goals", JSON.stringify(pointsArray));

    setShowConfirmationModal(false);
    setShowGoalsInput(false);
  };

  return (
    <div className="flex flex-col w-3/5 mx-auto">
      <div className="relative mb-4 mt-5">
        <textarea
          id="message"
          rows="4"
          className="block w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-200 text-primary"
          style={{ height: "auto" }}
          placeholder="Write your Goals here..."
          onChange={(e) => {
            e.target.rows = Math.ceil(e.target.scrollHeight / 25);
            setGoalsText(e.target.value);
          }}
        ></textarea>
        <div className="absolute bottom-2 right-2 text-gray-400 text-xs">
          *Press Enter for New Goal
        </div>
      </div>

      <div className="flex justify-start">
        <button
          type="button"
          className="text-white bg-secondary border border-2 border-secondary hover:border-secondary hover:bg-white hover:text-secondary font-medium rounded-md text-md px-6 py-2 text-center mb-2"
          onClick={() => {
            setShowConfirmationModal(true);
          }}
          disabled={goalsText.length <= 0}
        >
          Set Goals
        </button>
        <button
          type="button"
          className="text-gray-400 border border-2 border-gray-400 hover:bg-gray-400 hover:text-white font-medium rounded-md text-md px-4 py-1.5 text-center mb-2 ml-2"
          onClick={() => {
            setShowGoalsInput(false);
          }}
        >
          Cancel
        </button>
      </div>

      {/* Show Confirmation Modal */}
      {showConfirmationModal ? (
        <ConfirmationModal
          setShowModal={setShowConfirmationModal}
          onConfirm={handleSetGoals}
          goals={goalsText}
        />
      ) : null}
    </div>
  );
};

GoalsInput.propTypes = {
  setShowGoalsInput: PropTypes.func.isRequired,
};

export default GoalsInput;
