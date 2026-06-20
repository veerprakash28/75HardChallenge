import PropTypes from "prop-types";

const ResetModal = ({ onReset, onResume }) => {
  const lastActiveDateStr = localStorage.getItem("lastCompletedDate");
  const lastActive = lastActiveDateStr 
    ? new Date(lastActiveDateStr).toLocaleDateString()
    : "recently";

  const storedStartDate = localStorage.getItem("startDate");
  const daysCompleted = parseInt(localStorage.getItem("daysCompleted") || "0", 10);

  let skippedDays = 0;
  if (storedStartDate) {
    const startDateObj = new Date(storedStartDate);
    const todayDateObj = new Date();
    const startDay = new Date(startDateObj.getFullYear(), startDateObj.getMonth(), startDateObj.getDate());
    const todayDay = new Date(todayDateObj.getFullYear(), todayDateObj.getMonth(), todayDateObj.getDate());
    const timeDiff = todayDay - startDay;
    const elapsedDays = Math.max(0, Math.round(timeDiff / (1000 * 60 * 60 * 24)));
    skippedDays = Math.max(0, elapsedDays - daysCompleted);
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 select-none animate-fadeIn">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 max-w-md w-11/12 shadow-2xl space-y-4">
          {/* Modal Header */}
          <div className="pb-3 border-b border-gray-100">
            <h3 className="text-xl font-extrabold text-primary">
              Streak Broken 😥
            </h3>
          </div>

          {/* Modal Body */}
          <div className="space-y-3">
            <div className="text-secondary text-sm font-bold bg-orange-50 border border-orange-100 p-2.5 rounded-xl">
              You were last active on: <span className="text-primary font-extrabold">{lastActive}</span>
            </div>
            
            {skippedDays > 0 && (
              <div className="text-red-800 text-xs font-bold bg-red-50 border border-red-100 p-2.5 rounded-xl">
                ⚠️ You missed completing your checklist for {skippedDays} day{skippedDays !== 1 ? "s" : ""}.
              </div>
            )}

            <p className="text-sm font-semibold text-primary leading-relaxed">
              Keep your head up! Setbacks are a natural part of any journey. You can choose to start fresh from Day 1, or skip the missed days and resume from where you left off.
            </p>
          </div>

          {/* Modal Footer */}
          <div className="flex flex-col gap-2.5 pt-4 border-t border-gray-100">
            <button
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-white text-sm font-semibold shadow-md shadow-primary/10 transition w-full"
              type="button"
              onClick={() => onResume(skippedDays)}
            >
              Resume Challenge (Skip {skippedDays} Day{skippedDays !== 1 ? "s" : ""}) 🔄
            </button>
            <button
              className="px-6 py-2.5 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 text-sm font-semibold transition w-full"
              type="button"
              onClick={onReset}
            >
              Reset & Start Over 🗑️
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

ResetModal.propTypes = {
  onReset: PropTypes.func.isRequired,
  onResume: PropTypes.func.isRequired,
};

export default ResetModal;
