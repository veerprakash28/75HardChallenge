import PropTypes from "prop-types";
import { Clock, ShieldAlert, Award, FileText, CheckCircle } from "lucide-react";

const RulesModal = ({ setShowModal }) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 select-none animate-fadeIn">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 max-w-2xl w-11/12 shadow-2xl flex flex-col justify-between max-h-[85vh]">
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="text-xl font-extrabold text-primary flex items-center gap-2">
              <FileText className="w-5 h-5 text-secondary" />
              75 Hard Challenge Rules
            </h3>
            <button
              className="text-gray-400 hover:text-primary transition text-2xl font-bold p-1 leading-none"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="py-5 overflow-y-auto space-y-5 pr-1 text-left">
            {/* Rule 1 */}
            <div className="flex gap-3.5 items-start">
              <div className="bg-primary/10 text-primary p-2 rounded-xl flex-shrink-0">
                <Clock className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-primary">Challenge Duration</h4>
                <p className="text-xs font-semibold text-secondary leading-relaxed">
                  The challenge must be followed for **75 consecutive days** without exception.
                </p>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="flex gap-3.5 items-start">
              <div className="bg-primary/10 text-primary p-2 rounded-xl flex-shrink-0">
                <CheckCircle className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-extrabold text-primary">Daily Habits Checklist</h4>
                <p className="text-xs font-semibold text-secondary leading-relaxed mb-1">
                  You commit to completing the following actions every single day:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-primary">
                  <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl flex items-center gap-2">
                    🏋️‍♂️ Two 45-min workouts (one outdoor)
                  </div>
                  <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl flex items-center gap-2">
                    💧 Drink 4 liters of water
                  </div>
                  <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl flex items-center gap-2">
                    📖 Read 10 pages of non-fiction
                  </div>
                  <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl flex items-center gap-2">
                    🍎 Stick to diet & zero alcohol
                  </div>
                </div>
              </div>
            </div>

            {/* Rule 3 */}
            <div className="flex gap-3.5 items-start">
              <div className="bg-orange-50 text-orange-600 p-2 rounded-xl flex-shrink-0 border border-orange-100">
                <ShieldAlert className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-primary">Strict Failure Consequence</h4>
                <p className="text-xs font-semibold text-secondary leading-relaxed">
                  If you fail to check off and log even a single habit by the end of the day, your streak breaks. All progress will clear, and you must start over from **Day 1**.
                </p>
              </div>
            </div>

            {/* Rule 4 */}
            <div className="flex gap-3.5 items-start">
              <div className="bg-primary/10 text-primary p-2 rounded-xl flex-shrink-0">
                <Award className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-primary">Goal Submission</h4>
                <p className="text-xs font-semibold text-secondary leading-relaxed">
                  You define your specific goals list at the start of the challenge. Once set, your checklist is locked and cannot be edited.
                </p>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end pt-4 border-t border-gray-100">
            <button
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-white text-sm font-semibold shadow-md shadow-primary/10 transition w-full sm:w-auto"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Got it, let&apos;s do this! 💪
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

RulesModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};

export default RulesModal;
