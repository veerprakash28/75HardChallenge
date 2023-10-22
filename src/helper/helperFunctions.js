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
// Streak will end if the user is inactive till 23:59 PM of current date
export const isStreakOngoing = () => {
  const storedStartDate = localStorage.getItem("startDate");
  const startDateObj = new Date(storedStartDate);
  const todayDateObj = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = todayDateObj - startDateObj;

  // Calculate the maximum allowed time difference for the streak to be considered ongoing (24 hours in milliseconds)
  const allowedTimeDifference = 24 * 60 * 60 * 1000;

  // Compare the time difference with the allowed time difference
  return timeDifference <= allowedTimeDifference;
};
