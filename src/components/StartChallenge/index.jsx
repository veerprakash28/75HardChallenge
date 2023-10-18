import { useEffect, useState } from "react";
import RulesModal from "./RulesModal";
import GoalsInput from "./GoalsInput";
import GoalsList from "./GoalsList";

const StartChallenge = () => {
  const [showModal, setShowModal] = useState(false);
  const [showGoalsInput, setShowGoalsInput] = useState(false);
  const [goalsList, setGoalsList] = useState([]);

  useEffect(() => {
    const goals = localStorage.getItem("goals");
    const parsedGoals = JSON.parse(goals);
    parsedGoals ? setGoalsList(parsedGoals) : setGoalsList([]);
  }, [showGoalsInput]);

  return (
    <>
      <div className="flex items-center justify-between lg:px-20 px-8">
        {!showGoalsInput && goalsList.length === 0 ? (
          <button
            type="button"
            className="text-white bg-gradient-to-br from-primary to-secondary hover:bg-gradient-to-bl font-medium rounded-full text-md px-7 py-2.5 text-center mr-1 mb-2"
            onClick={() => {
              setShowGoalsInput(true);
            }}
          >
            Set Goals
          </button>
        ) : (
          <div className="text-xl font-semibold text-secondary lg:ml-5">
            Your 75 Days Goals:
          </div>
        )}

        <button
          className="ml-auto font-bold uppercase text-sm px-3 py-1 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"></path>
          </svg>
        </button>

        {/* Show Rules Modal */}
        {showModal ? <RulesModal setShowModal={setShowModal} /> : null}
      </div>

      {/* Render Goals List when it is stored */}
      {goalsList.length > 0 && <GoalsList goalsList={goalsList} />}

      {/* Show Goals Input Section */}
      {showGoalsInput && <GoalsInput setShowGoalsInput={setShowGoalsInput} />}
    </>
  );
};

export default StartChallenge;
