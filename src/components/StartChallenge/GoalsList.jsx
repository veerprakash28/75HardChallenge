import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const GoalsList = ({ goalsList }) => {
  const [challengeDate, setChallengeDate] = useState("");
  const [challengeEndDate, setChallengeEndDate] = useState("");
  const startDate = localStorage.getItem("startDate");
  const endDate = localStorage.getItem("endDate");

  useEffect(() => {
    const parseDate = (date) => {
      const parsedDate = new Date(date);
      return parsedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    };

    if (startDate) {
      setChallengeDate(parseDate(startDate));
    }

    if (endDate) {
      setChallengeEndDate(parseDate(endDate));
    }
  }, [startDate, endDate]);

  return (
    <>
      <div className="flex flex-col items-start lg:px-20 px-12">
        <ul className="lg:ml-4 list-disc text-primary leading-relaxed lg:pl-20 mt-5">
          {goalsList.map((goal, index) => (
            <li
              key={index}
              className="mb-2 lg:text-lg text-md bg-gray-300 p-2 text-primary rounded w-fit"
            >
              {goal}
            </li>
          ))}
        </ul>

        <div className="sm:flex justify-between w-full border-b border-blueGray-20 py-4">
          <div className="text-gray-500 text-xs font-medium mb-2 lg:ml-6">
            Challenge Started on: {challengeDate}
          </div>
          <div className="text-gray-500 text-xs font-medium mb-2 lg:mr-6">
            Challenge Ends on: {challengeEndDate}
          </div>
        </div>
      </div>
    </>
  );
};

GoalsList.propTypes = {
  goalsList: PropTypes.func.isRequired,
};

export default GoalsList;
