// eslint-disable-next-line react/prop-types
const RulesModal = ({ setShowModal }) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white border border-blueGray-200 rounded-lg p-6 max-w-3xl w-4/5 h-1/2 overflow-y-auto">
          {/* Modal content */}
          <div className="flex justify-between border-b border-blueGray-200 pb-5">
            <h3 className="text-3xl font-semibold text-primary">
              75 Hard Challenge Rules
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
                Duration
              </h3>
              <ul className="ml-6 list-disc text-blueGray-500 leading-relaxe">
                <li>
                  The Challenge will last for a period of 75 consecutive days
                </li>
              </ul>
            </div>

            <div className="my-4">
              <h3 className="text-lg font-semibold mb-2 text-secondary">
                Goal Submission
              </h3>
              <ul className="ml-6 list-disc text-blueGray-500 leading-relaxe">
                <li>
                  Participants must submit their set of goals for the entire
                  75-day period at the start of the Challenge
                </li>
                <li>
                  Once goals are submitted, they cannot be changed during the
                  Challenge
                </li>
              </ul>
            </div>

            <div className="my-4">
              <h3 className="text-lg font-semibold mb-2 text-secondary">
                Progress Tracking
              </h3>
              <ul className="ml-6 list-disc text-blueGray-500 leading-relaxe">
                <li>
                  Participants are required to log in to the Challenge website
                  daily to mark their progress for the day as completed
                </li>
                <li>Progress can be tracked using a visual progress bar</li>
              </ul>
            </div>

            <div className="my-4">
              <h3 className="text-lg font-semibold mb-2 text-secondary">
                Challenge Interruption
              </h3>
              <ul className="ml-6 list-disc text-blueGray-500 leading-relaxe">
                <li>
                  If a participant fails to mark a day as completed within the
                  24-hour timeframe, the Challenge for that day is considered
                  skipped
                </li>
                <li>
                  Skipping a day during the 75-day period will result in the
                  participant&apos;s Challenge being halted
                </li>
                <li>
                  In the event of a skipped day, all goals will be reset, and
                  the participant must start the Challenge from the beginning
                </li>
              </ul>
            </div>

            <div className="my-4">
              <h3 className="text-lg font-semibold mb-2 text-secondary">
                Timer and Goal Completion
              </h3>
              <ul className="ml-6 list-disc text-blueGray-500 leading-relaxe">
                <li>
                  Participants have a 24-hour window each day to mark their
                  daily goal as completed
                </li>
              </ul>
            </div>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end px-6 pt-4 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="bg-secondary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default RulesModal;
