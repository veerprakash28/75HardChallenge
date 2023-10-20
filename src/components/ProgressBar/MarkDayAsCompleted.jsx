import PropTypes from "prop-types";

const MarkDayAsCompleted = ({ setShowModal, onConfirm }) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="flex flex-col justify-between bg-white border border-blueGray-200 rounded-lg p-6 max-w-2xl w-4/5 h-2/5 overflow-y-auto">
          {/* Modal content */}
          <div className="flex items-center justify-between border-b border-blueGray-200 pb-5">
            <h3 className="text-md md:text-xl lg:text-3xl font-semibold text-primary">
              Mark Your Day As Completed!
            </h3>
            <button
              className="text-black opacity-50 hover:opacity-100"
              onClick={() => setShowModal(false)}
            >
              <span className="bg-transparent text-primary w-6 text-2xl block">
                ×
              </span>
            </button>
          </div>

          <div className="px-4">
            {/* Body */}
            <div className="my-4">
              <h3 className="text-md lg:text-xl font-semibold mb-2 text-secondary">
                Congratulations! 🌟
              </h3>
              <p className="text-primary text-sm lg:text-base">
                Well done on completing another day of your challenge! Remember,
                challenges are about discipline and commitment, so stay true to
                your goals. Your dedication will lead to amazing results! 🚀
              </p>
            </div>
          </div>
          {/* Footer */}
          <div className="flex items-center justify-center md:justify-end px-6 pt-4 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="bg-secondary text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-2 lg:px-6 lg:py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onConfirm}
            >
              Let&apos;s Do This!
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

MarkDayAsCompleted.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default MarkDayAsCompleted;
