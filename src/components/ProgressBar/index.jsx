import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getMotivationalQuote } from "../../helper/helperFunctions";
import MarkDayAsCompleted from "./MarkDayAsCompleted";
import Footer from "../Footer";

const ProgressBar = ({ startDate, endDate }) => {
  // State variables
  const [progress, setProgress] = useState(0);
  const [lastActive, setLastActive] = useState("");
  const [daysCompleted, setDaysCompleted] = useState(0);
  const [showMarkDayAsCompletedModal, setShowMarkDayAsCompletedModal] =
    useState(false);

  const [lastCompletedDate, setLastCompletedDate] = useState(
    new Date(localStorage.getItem("lastCompletedDate"))
  );

  const storedIsDayCompleted =
    localStorage.getItem("isDayCompleted") === "true";
  const [isDayCompleted, setIsDayCompleted] = useState(storedIsDayCompleted);
  const [quote, setQuote] = useState("");

  // Calculate progress, days completed, and motivational quote
  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const lastActiveStreak = lastCompletedDate;

    const totalDuration = end - start;
    const elapsedDuration = lastActiveStreak - start;

    const percentage = (elapsedDuration / totalDuration) * 100;
    const daysCompleted = Math.floor(elapsedDuration / (1000 * 60 * 60 * 24));

    setDaysCompleted(daysCompleted);
    setProgress(percentage);

    const motivationalQuote = getMotivationalQuote(percentage);
    setQuote(motivationalQuote);
  }, [startDate, endDate, lastCompletedDate]);

  // Check if the current day is marked as completed
  useEffect(() => {
    const currentDate = new Date();
    const lastCompleted = lastCompletedDate;

    const isSameDay =
      currentDate.toLocaleDateString() === lastCompleted.toLocaleDateString();

    if (!isSameDay) {
      localStorage.setItem("isDayCompleted", false);
      setIsDayCompleted(false);
    }
  }, [lastCompletedDate, isDayCompleted]);

  // Mark the current day as completed
  const handleMarkDayAsCompleted = () => {
    if (!isDayCompleted) {
      const currentDate = new Date();
      setLastCompletedDate(currentDate);
      localStorage.setItem("lastCompletedDate", currentDate);
      localStorage.setItem("isDayCompleted", true);
      setIsDayCompleted(true);
      setShowMarkDayAsCompletedModal(false);
    }
  };

  // Set the current date
  useEffect(() => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const lastActive = new Date(lastCompletedDate).toLocaleDateString(
      undefined,
      options
    );

    setLastActive(lastActive);
  }, [lastCompletedDate]);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col items-center justify-center lg:px-20 px-8 mb-20">
        <div className="flex items-center justify-between w-full">
          <div className="sm:text-xl font-semibold text-secondary lg:ml-5 mt-5">
            Your Progress as of: {lastActive}
          </div>
          {!isDayCompleted && (
            <div
              className="text-sm font-medium text-primary mt-5 cursor-pointer text-right"
              onClick={() => setShowMarkDayAsCompletedModal(true)}
            >
              Mark Your Day as Completed
            </div>
          )}
        </div>

        <div className="w-full max-w-screen-lg bg-gray-400 m-4 rounded-full mt-8">
          <div
            className="h-5 bg-primary rounded-full flex items-center justify-end transition-width duration-1000"
            style={{ width: `${Math.floor(progress)}%` }}
          >
            <span className="text-white p-4 font-bold flex items-center">
              {`${Math.floor(progress)}% `}
              <span role="img" aria-label="rocket" className="ml-4">
                🚀
              </span>
            </span>
          </div>
        </div>

        <div className="font-bold text-primary text-lg">
          {daysCompleted} / 75
        </div>
        <div className="font-md text-secondary text-center">{quote}</div>

        {showMarkDayAsCompletedModal && (
          <MarkDayAsCompleted
            setShowModal={setShowMarkDayAsCompletedModal}
            onConfirm={handleMarkDayAsCompleted}
          />
        )}
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

ProgressBar.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default ProgressBar;
