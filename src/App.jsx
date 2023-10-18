import Header from "./components/Header/Header";
import ProgressBar from "./components/ProgressBar";
import StartChallenge from "./components/StartChallenge/index";

export default function App() {
  const startDate = localStorage.getItem("startDate");
  const endDate = localStorage.getItem("endDate");

  // Check if both startDate and endDate are available in localStorage
  const shouldRenderProgressBar = startDate && endDate;

  return (
    <>
      <Header />
      <StartChallenge />
      {shouldRenderProgressBar && (
        <ProgressBar startDate={startDate} endDate={endDate} />
      )}
    </>
  );
}
