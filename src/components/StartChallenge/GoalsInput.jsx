import PropTypes from "prop-types";

const GoalsInput = ({ setShowGoalsInput }) => {
  return (
    <div className="flex flex-col w-3/5 mx-auto">
      <div className="mb-4">
        <textarea
          id="message"
          rows="4"
          className="block w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-200 text-primary"
          style={{ height: "auto" }}
          placeholder="Write your Goals here..."
          onChange={(e) => {
            e.target.rows = Math.ceil(e.target.scrollHeight / 25);
          }}
        ></textarea>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="text-secondary border border-2 border-primary hover:bg-primary hover:text-white font-medium rounded-full text-md px-4 py-1.5 text-center mb-2 mr-2"
          onClick={() => {
            setShowGoalsInput(false);
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          className="text-white bg-secondary border border-secondary hover:border hover:border-secondary hover:bg-white hover:text-secondary font-medium rounded-full text-md px-6 py-2 text-center mb-2"
          onClick={() => {
            setShowGoalsInput(false);
          }}
        >
          Set Goals
        </button>
      </div>
    </div>
  );
};

GoalsInput.propTypes = {
  setShowGoalsInput: PropTypes.func.isRequired,
};

export default GoalsInput;
