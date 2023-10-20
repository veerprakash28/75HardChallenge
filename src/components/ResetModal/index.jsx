import PropTypes from "prop-types";

const ResetModal = ({ onConfirm }) => {
  const lastActive = new Date(
    localStorage.getItem("lastCompletedDate")
  ).toLocaleDateString();

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="flex flex-col justify-between bg-white border border-blueGray-200 rounded-lg p-6 max-w-3xl w-3/5 h-2/5 overflow-y-auto">
          {/* Modal content */}
          <div className="flex items-center justify-between border-b border-blueGray-200 pb-5">
            <h3 className="text-md lg:text-3xl font-semibold text-primary">
              Oops! Your Streak Is Broken 😥
            </h3>
          </div>

          <div className="px-4">
            <div className="text-primary text-sm lg:text-base my-4">
              You were last active on:{" "}
              <span className="font-bold">{lastActive}</span>
            </div>
            {/* Body */}
            <div className="my-4">
              <p className="text-secondary text-sm lg:text-base">
                Keep your head up! Starting fresh is just another opportunity to
                do better. You&apos;ve got this! 💪
              </p>
            </div>

            <div className="my-4">
              <p className="text-secondary text-sm lg:text-base">
                In this journey, you&apos;ll face setbacks, but it&apos;s how
                you overcome them that matters most. Get back on track and crush
                your goals! 🚀
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center lg:justify-end px-3 lg:px-6 pt-4 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="bg-secondary text-white active:bg-emerald-600 font-bold uppercase text-sm px-1.5 py-2 lg:px-6 lg:py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => onConfirm()}
            >
              Get Back on Track
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

ResetModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default ResetModal;
