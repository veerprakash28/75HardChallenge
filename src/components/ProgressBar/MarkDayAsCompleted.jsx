import PropTypes from "prop-types";

const MarkDayAsCompleted = ({ setShowModal, onConfirm }) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 select-none animate-fadeIn">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 max-w-md w-11/12 shadow-2xl space-y-4">
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-xl font-extrabold text-primary">
              Mark Day Completed? 🎉
            </h3>
            <button
              className="text-gray-400 hover:text-primary transition text-2xl font-bold p-1 leading-none"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
          </div>

          {/* Modal Body */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-secondary uppercase tracking-wider">
              Congratulations! 🌟
            </h4>
            <p className="text-sm font-semibold text-primary leading-relaxed">
              Well done on completing all your habits for today! Remember, challenges are about consistent discipline. Your dedication will lead to incredible results! 🚀
            </p>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-secondary text-sm font-semibold transition"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-white text-sm font-semibold shadow-md shadow-primary/10 transition"
              type="button"
              onClick={onConfirm}
            >
              Lock In Completion 🚀
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

MarkDayAsCompleted.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default MarkDayAsCompleted;
