import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const ConfirmationModal = ({ setShowModal, onConfirm, goals }) => {
  const [goalsList, setGoalsList] = useState([]);

  useEffect(() => {
    const pointsArray = goals
      .split("\n")
      .filter((point) => point.trim() !== "");

    setGoalsList(pointsArray);
  }, [goals]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="flex flex-col justify-between bg-white border border-blueGray-200 rounded-lg p-6 max-w-3xl w-4/5 h-1/2 overflow-y-auto">
          {/* Modal content */}
          <div className="flex justify-between border-b border-blueGray-200 pb-5">
            <h3 className="text-3xl font-semibold text-primary">
              Are you Sure?
            </h3>
            <button
              className="text-black opacity-50 hover:opacity-100"
              onClick={() => setShowModal(false)}
            >
              <span className="bg-transparent text-primary h-6 w-6 text-2xl block">
                ×
              </span>
            </button>
          </div>
          <div className="px-4">
            {/*body*/}
            <div className="my-4">
              <h3 className="text-lg font-semibold mb-2 text-secondary">
                Confirm Your 75 Days Goals
              </h3>
              <ul className="ml-10 list-disc text-blueGray-500 leading-relaxe">
                {goalsList.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end px-6 pt-4 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="bg-secondary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onConfirm}
            >
              Yes, Confirm
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

ConfirmationModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  goals: PropTypes.string.isRequired,
};

export default ConfirmationModal;
