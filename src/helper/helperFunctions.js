// Function for Generating QUOTES as per the progress
export const getMotivationalQuote = (progress) => {
  const quotes = [
    "Every small step you take gets you closer to your goal. 🚀",
    "Believe in yourself, and you'll be unstoppable. 💪",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. 🌟",
    "You are stronger than you think. 💯",
    "Keep going; each step may get harder, but don't stop. The view is beautiful at the top. 🏞️",
  ];

  // Assuming progress is a number between 0 and 100
  if (progress < 20) {
    return quotes[0]; // Provide quotes for different progress levels
  } else if (progress < 40) {
    return quotes[1];
  } else if (progress < 60) {
    return quotes[2];
  } else if (progress < 80) {
    return quotes[3];
  } else {
    return quotes[4];
  }
};

// Function to validate streak
// Streak is ongoing if the user has completed at least as many days as calendar days elapsed since start
export const isStreakOngoing = () => {
  const storedStartDate = localStorage.getItem("startDate");
  if (!storedStartDate) return true;

  const startDateObj = new Date(storedStartDate);
  const todayDateObj = new Date();

  // Calculate calendar days elapsed since start date
  const startDay = new Date(startDateObj.getFullYear(), startDateObj.getMonth(), startDateObj.getDate());
  const todayDay = new Date(todayDateObj.getFullYear(), todayDateObj.getMonth(), todayDateObj.getDate());

  const timeDiff = todayDay - startDay;
  const elapsedDays = Math.max(0, Math.round(timeDiff / (1000 * 60 * 60 * 24)));

  const daysCompleted = parseInt(localStorage.getItem("daysCompleted") || "0", 10);

  return daysCompleted >= elapsedDays;
};
