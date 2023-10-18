import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ startDate, endDate }) => {
  const [progress, setProgress] = useState(0);
  const [today, setToday] = useState("");
  const [daysCompleted, setDaysCompleted] = useState("");

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const currentDate = new Date();

    const totalDuration = end - start;
    const elapsedDuration = currentDate - start;

    const percentage = (elapsedDuration / totalDuration) * 100;
    // const percentage = 5;

    const daysCompleted = Math.floor(elapsedDuration / (1000 * 60 * 60 * 24));
    setDaysCompleted(daysCompleted);

    setProgress(percentage > 100 ? 100 : percentage);
  }, [startDate, endDate]);

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    setToday(today);
  }, []);

  return (
    <>
      <div className="lg:px-20 px-8">
        <div className="flex items-center justify-between">
          <div className="sm:text-xl font-semibold text-secondary lg:ml-5 mt-5">
            Your Progress on: {today}
          </div>

          <div className="text-sm font-medium text-primary lg:mr-5 mt-5 cursor-pointer">
            Mark Your Day as Completed
          </div>
        </div>

        <div className="w-full h-5 bg-gray-400 m-4 rounded-full">
          <div
            className="h-full bg-primary rounded-full flex items-center justify-center transition-width duration-1000"
            style={{ width: `${progress}%` }}
          >
            <span className="text-white p-4 font-bold">{`${Math.round(
              progress
            )}%`}</span>
          </div>
        </div>

        <div className="flex items-center justify-center font-bold text-primary text-lg">
          {daysCompleted} / 75
        </div>
      </div>
    </>
  );
};

ProgressBar.propTypes = {
  startDate: PropTypes.func.isRequired,
  endDate: PropTypes.func.isRequired,
};

export default ProgressBar;
