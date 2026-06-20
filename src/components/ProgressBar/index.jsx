import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getMotivationalQuote } from "../../helper/helperFunctions";
import MarkDayAsCompleted from "./MarkDayAsCompleted";
import Footer from "../Footer";

const ProgressBar = ({ startDate, endDate }) => {
  // State variables
  const [progress, setProgress] = useState(0);
  const [lastActive, setLastActive] = useState("");
  const [daysCompleted, setDaysCompleted] = useState(() => {
    return parseInt(localStorage.getItem("daysCompleted") || "0", 10);
  });
  const [showMarkDayAsCompletedModal, setShowMarkDayAsCompletedModal] =
    useState(false);

  const [lastCompletedDate, setLastCompletedDate] = useState(() => {
    const dateStr = localStorage.getItem("lastCompletedDate");
    return dateStr ? new Date(dateStr) : new Date();
  });

  const storedIsDayCompleted =
    localStorage.getItem("isDayCompleted") === "true";
  const [isDayCompleted, setIsDayCompleted] = useState(storedIsDayCompleted);
  const [quote, setQuote] = useState("");

  // Calculate progress and motivational quote based on daysCompleted
  useEffect(() => {
    const percentage = Math.min(100, (daysCompleted / 75) * 100);
    setProgress(percentage);

    const motivationalQuote = getMotivationalQuote(percentage);
    setQuote(motivationalQuote);
  }, [daysCompleted]);

  // Check if the current day is marked as completed
  useEffect(() => {
    if (daysCompleted >= 75) return;

    const currentDate = new Date();
    const lastCompleted = lastCompletedDate;

    const isSameDay =
      currentDate.toLocaleDateString() === lastCompleted.toLocaleDateString();

    if (!isSameDay) {
      localStorage.setItem("isDayCompleted", "false");
      setIsDayCompleted(false);
    }
  }, [lastCompletedDate, isDayCompleted, daysCompleted]);

  // Mark the current day as completed
  const handleMarkDayAsCompleted = () => {
    if (!isDayCompleted && daysCompleted < 75) {
      const currentDate = new Date();
      const nextDaysCompleted = daysCompleted + 1;

      setLastCompletedDate(currentDate);
      localStorage.setItem("lastCompletedDate", currentDate.toISOString());
      localStorage.setItem("isDayCompleted", "true");
      setIsDayCompleted(true);

      setDaysCompleted(nextDaysCompleted);
      localStorage.setItem("daysCompleted", nextDaysCompleted.toString());

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
          {daysCompleted >= 75 ? (
            <div className="text-sm font-bold text-emerald-600 mt-5 lg:mr-5 flex items-center gap-1">
              🏆 Challenge Completed! 🎉
            </div>
          ) : (
            !isDayCompleted && (
              <div
                className="text-sm font-medium text-primary mt-5 cursor-pointer text-right hover:text-secondary transition"
                onClick={() => setShowMarkDayAsCompletedModal(true)}
              >
                Mark Your Day as Completed
              </div>
            )
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
        {daysCompleted >= 75 ? (
          <div className="font-bold text-emerald-600 text-center mt-2 text-xl animate-bounce">
            Incredible! You completed the 75 Hard Challenge! 🏆🎉💪
          </div>
        ) : (
          <div className="font-md text-secondary text-center">{quote}</div>
        )}

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
