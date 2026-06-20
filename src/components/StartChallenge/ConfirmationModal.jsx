import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Check } from "lucide-react";

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
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 select-none animate-fadeIn">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 max-w-lg w-11/12 shadow-2xl flex flex-col justify-between max-h-[90vh]">
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="text-xl font-extrabold text-primary">
              Are you sure? 🤔
            </h3>
            <button
              className="text-gray-400 hover:text-primary transition text-2xl font-bold p-1 leading-none"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
          </div>
          
          {/* Modal Body */}
          <div className="py-5 overflow-y-auto space-y-4">
            <h4 className="text-sm font-bold text-secondary uppercase tracking-wider">
              Confirm Your 75 Days Goals 🚀
            </h4>
            <ul className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {goalsList.map((goal, index) => (
                <li key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm font-semibold text-primary">
                  <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="break-all">{goal}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">
              Once submitted, these goals cannot be edited for the entire 75-day period. Make sure you are ready to commit!
            </p>
          </div>
          
          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-secondary text-sm font-semibold transition"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Go Back
            </button>
            <button
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-white text-sm font-semibold shadow-md shadow-primary/10 transition"
              type="button"
              onClick={onConfirm}
            >
              Yes, Confirm Goals
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

ConfirmationModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  goals: PropTypes.string.isRequired,
};

export default ConfirmationModal;
