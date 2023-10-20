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
    localStorage.clear();
    setShowResetModal(false);
    window.location.reload();
  };

  const shouldRenderProgressBar = startDate && endDate;

  return (
    <>
      <Header />
      <StartChallenge />
      {shouldRenderProgressBar && (
        <ProgressBar startDate={startDate} endDate={endDate} />
      )}
      {showResetModal && <ResetModal onConfirm={handleReset} />}
    </>
  );
}
