import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const GoalsList = ({ goalsList }) => {
  const [challengeDate, setChallengeDate] = useState("");
  const startDate = localStorage.getItem("startDate");

  useEffect(() => {
    // Parse the startDate string into a Date object
    const parsedDate = new Date(startDate);

    const formattedDate = parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const formattedTime = parsedDate.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const dateTime = `${formattedDate} | ${formattedTime}`;

    setChallengeDate(dateTime);
  }, [startDate]);

  return (
    <>
      <div className="flex flex-col items-start lg:px-20 px-12">
        <ul className="lg:ml-6 list-disc text-primary leading-relaxe lg:pl-20 mt-5">
          {goalsList.map((goal, index) => (
            <li key={index} className="mb-2 text-lg">
              {goal}
            </li>
          ))}
        </ul>

        <div className="text-gray-500 text-xs font-medium ml-auto">
          Challenge Started on: {challengeDate}
        </div>
      </div>
    </>
  );
};

GoalsList.propTypes = {
  goalsList: PropTypes.func.isRequired,
};

export default GoalsList;
