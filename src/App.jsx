import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import ProgressBar from "./components/ProgressBar";
import ResetModal from "./components/ResetModal";
import StartChallenge from "./components/StartChallenge/index";
import { isStreakOngoing } from "./helper/helperFunctions";

export default function App() {
  const startDate = localStorage.getItem("startDate");
  const endDate = localStorage.getItem("endDate");

  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    const isStreakValid = isStreakOngoing();
    if (!isStreakValid && startDate) setShowResetModal(true);
  }, [startDate]);

  const handleReset = () => {
    const previousGoals = localStorage.getItem("goals");
    localStorage.clear();
    if (previousGoals) {
      localStorage.setItem("goals", previousGoals);
    }
    setShowResetModal(false);
    window.location.reload();
  };

  const handleResume = (skippedDays) => {
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");
    if (storedStartDate && storedEndDate) {
      const startDateObj = new Date(storedStartDate);
      const endDateObj = new Date(storedEndDate);
      const msToShift = skippedDays * 24 * 60 * 60 * 1000;

      const newStartDate = new Date(startDateObj.getTime() + msToShift);
      const newEndDate = new Date(endDateObj.getTime() + msToShift);

      localStorage.setItem("startDate", newStartDate.toISOString());
      localStorage.setItem("endDate", newEndDate.toISOString());

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      localStorage.setItem("lastCompletedDate", yesterday.toISOString());
      localStorage.setItem("isDayCompleted", "false");

      const goals = JSON.parse(localStorage.getItem("goals") || "[]");
      const initialChecked = goals.map(() => false);
      localStorage.setItem("checkedGoals", JSON.stringify(initialChecked));

      setShowResetModal(false);
      window.location.reload();
    }
  };

  const shouldRenderProgressBar = startDate && endDate;

  return (
    <>
      <Header />
      {shouldRenderProgressBar ? (
        <ProgressBar startDate={startDate} endDate={endDate} />
      ) : (
        <StartChallenge />
      )}
      {showResetModal && (
        <ResetModal onReset={handleReset} onResume={handleResume} />
      )}
    </>
  );
}
