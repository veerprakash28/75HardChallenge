import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getMotivationalQuote } from "../../helper/helperFunctions";
import MarkDayAsCompleted from "./MarkDayAsCompleted";
import RulesModal from "../StartChallenge/RulesModal";
import Footer from "../Footer";
import { Flame, Trophy, Award, Calendar, Check, Zap } from "lucide-react";

const ProgressBar = ({ startDate, endDate }) => {
  const formattedStartDate = new Date(startDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedEndDate = new Date(endDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const [progress, setProgress] = useState(0);
  const [lastActive, setLastActive] = useState("");
  const [showMarkDayAsCompletedModal, setShowMarkDayAsCompletedModal] =
    useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [quote, setQuote] = useState("");

  // Retrieve goals list
  const [goalsList] = useState(() => {
    return JSON.parse(localStorage.getItem("goals") || "[]");
  });

  // State for days completed
  const [daysCompleted, setDaysCompleted] = useState(() => {
    return parseInt(localStorage.getItem("daysCompleted") || "0", 10);
  });

  // Safe parsing for lastCompletedDate
  const [lastCompletedDate, setLastCompletedDate] = useState(() => {
    const dateStr = localStorage.getItem("lastCompletedDate");
    return dateStr ? new Date(dateStr) : new Date();
  });

  const storedIsDayCompleted =
    localStorage.getItem("isDayCompleted") === "true";
  const [isDayCompleted, setIsDayCompleted] = useState(storedIsDayCompleted);

  // Checked goals state
  const [checkedGoals, setCheckedGoals] = useState(() => {
    const stored = localStorage.getItem("checkedGoals");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // ignore fallback
      }
    }
    return goalsList.map(() => false);
  });

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
      
      // Reset checklist for new day
      const initialChecked = goalsList.map(() => false);
      localStorage.setItem("checkedGoals", JSON.stringify(initialChecked));
      setCheckedGoals(initialChecked);
    }
  }, [lastCompletedDate, isDayCompleted, daysCompleted, goalsList]);

  // Set the formatted date
  useEffect(() => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const dateStr = new Date(lastCompletedDate).toLocaleDateString(
      undefined,
      options
    );
    setLastActive(dateStr);
  }, [lastCompletedDate]);

  // Checkbox handler
  const handleToggleGoal = (index) => {
    if (isDayCompleted || daysCompleted >= 75) return;
    const nextChecked = [...checkedGoals];
    nextChecked[index] = !nextChecked[index];
    setCheckedGoals(nextChecked);
    localStorage.setItem("checkedGoals", JSON.stringify(nextChecked));
  };

  // Mark the current day as completed
  const handleMarkDayAsCompleted = () => {
    if (!isDayCompleted && daysCompleted < 75) {
      const currentDate = new Date();
      const nextDaysCompleted = daysCompleted + 1;

      setLastCompletedDate(currentDate);
      localStorage.setItem("lastCompletedDate", currentDate.toISOString());
      localStorage.setItem("isDayCompleted", "true");
      setIsDayCompleted(true);

      // Force all checkboxes checked
      const completedChecked = goalsList.map(() => true);
      setCheckedGoals(completedChecked);
      localStorage.setItem("checkedGoals", JSON.stringify(completedChecked));

      setDaysCompleted(nextDaysCompleted);
      localStorage.setItem("daysCompleted", nextDaysCompleted.toString());

      setShowMarkDayAsCompletedModal(false);
    }
  };

  const allGoalsChecked = 
    checkedGoals.length > 0 && checkedGoals.every((val) => val === true);

  // Level config
  const currentLevel = Math.min(8, Math.floor(daysCompleted / 10) + 1);
  const getLevelName = (level) => {
    switch (level) {
      case 1: return "Novice Challenger";
      case 2: return "Habit Builder";
      case 3: return "Streaker";
      case 4: return "Disciplined Warrior";
      case 5: return "Unstoppable Force";
      case 6: return "Beast Mode";
      case 7: return "Elite Achiever";
      case 8: return "75 Hard Master 🏆";
      default: return "Challenger";
    }
  };

  // Achievements config
  const achievements = [
    { id: "start", name: "First Step", desc: "Complete Day 1", target: 1, icon: "🚀" },
    { id: "week1", name: "Week Warrior", desc: "Complete 7 days", target: 7, icon: "🛡️" },
    { id: "month1", name: "Iron Mind", desc: "Complete 30 days", target: 30, icon: "🧠" },
    { id: "gold", name: "Golden Streak", desc: "Complete 50 days", target: 50, icon: "👑" },
    { id: "finisher", name: "75 Hard Legend", desc: "Complete 75 days", target: 75, icon: "🏆" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50 justify-between">
      <main className="max-w-7xl w-full mx-auto px-6 sm:px-8 py-8 space-y-8 flex-grow">
        
        {/* Top welcome quote banner */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-3 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-primary">Daily Dashboard</h2>
                <button
                  type="button"
                  onClick={() => setShowRulesModal(true)}
                  className="text-[10px] font-bold text-secondary hover:text-white hover:bg-secondary bg-secondary/15 px-2 py-0.5 rounded-full transition-all duration-200 cursor-pointer shadow-sm border border-secondary/10"
                >
                  Rules
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirmModal(true)}
                  className="text-[10px] font-bold text-red-600 hover:text-white hover:bg-red-600 bg-red-50 px-2 py-0.5 rounded-full transition-all duration-200 cursor-pointer shadow-sm border border-red-200"
                >
                  Reset Challenge
                </button>
              </div>
              <p className="text-xs font-semibold text-secondary">
                Last checked completion: {lastActive}
              </p>
            </div>
          </div>
          <div className="flex-1 max-w-lg md:text-right">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Motivational Spark</span>
            <p className="text-sm font-semibold italic text-secondary">&ldquo;{quote}&rdquo;</p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Active checklist & progress */}
          <section className="lg:col-span-8 space-y-8">
            
            {/* Today's Checklist */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-extrabold text-primary">Today&apos;s Checklist</h2>
                  <p className="text-xs font-semibold text-secondary mt-0.5">
                    {isDayCompleted ? "Agenda cleared for today!" : "Check off all goals to log completion."}
                  </p>
                </div>
                {daysCompleted >= 75 ? (
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    🏆 Completed Tracker
                  </span>
                ) : isDayCompleted ? (
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                    ✨ Finished Today
                  </span>
                ) : (
                  <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
                    ⚡ Task Mode
                  </span>
                )}
              </div>

              {/* Checkbox Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {goalsList.map((goal, index) => {
                  const checked = checkedGoals[index] || isDayCompleted;
                  return (
                    <div
                      key={index}
                      onClick={() => handleToggleGoal(index)}
                      className={`flex items-center gap-3.5 p-4 rounded-xl border transition-all select-none ${
                        isDayCompleted || daysCompleted >= 75 ? 'pointer-events-none' : 'cursor-pointer'
                      } ${
                        checked
                          ? "bg-emerald-50/70 border-emerald-200 text-emerald-800 line-through decoration-emerald-300"
                          : "bg-gray-50 border-gray-150 text-primary hover:bg-gray-100/50 hover:border-gray-200"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          checked
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {checked && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                      </div>
                      <span className="font-bold text-sm tracking-tight">{goal}</span>
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="mt-8 border-t border-gray-100 pt-6 flex items-center justify-end">
                {daysCompleted >= 75 ? (
                  <div className="bg-emerald-50 text-emerald-800 text-sm font-extrabold px-6 py-3.5 rounded-xl border border-emerald-100 shadow-sm w-full text-center flex items-center justify-center gap-2">
                    <span>🏆</span> Challenge Completed! You are a Legend! <span>🎉</span>
                  </div>
                ) : isDayCompleted ? (
                  <div className="bg-emerald-50 text-emerald-800 text-sm font-extrabold px-6 py-3.5 rounded-xl border border-emerald-100 w-full text-center">
                    ✨ Today&apos;s goals locked and submitted. Check back tomorrow!
                  </div>
                ) : (
                  <button
                    type="button"
                    className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/95 text-white font-extrabold text-sm transition-all duration-200 shadow-md shadow-primary/10 disabled:opacity-50 disabled:pointer-events-none w-full sm:w-auto"
                    onClick={() => setShowMarkDayAsCompletedModal(true)}
                    disabled={!allGoalsChecked}
                  >
                    {!allGoalsChecked ? "Complete Checklist First ⚡" : "Log Today Completed! 🚀"}
                  </button>
                )}
              </div>
            </div>

            {/* Visual Progress Slider Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Overall Progress</span>
                <span className="text-xs font-extrabold text-primary">{Math.floor(progress)}% Complete</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-bold text-secondary mt-3">
                <span>Day 0</span>
                <span>Day {daysCompleted} / 75</span>
                <span>Day 75</span>
              </div>
              
              {/* Start & End Dates Display */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between text-xs font-bold text-secondary gap-2">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>Started: <span className="text-primary">{formattedStartDate}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-primary" />
                  <span>Ends: <span className="text-primary">{formattedEndDate}</span></span>
                </div>
              </div>
            </div>

          </section>

          {/* Right Column - Streak indicator & XP Leveling */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Snapchat Streak Flame */}
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg p-6 text-white text-center relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                <Flame className="w-40 h-40" />
              </div>
              <Flame className="w-16 h-16 text-amber-300 fill-amber-300 mx-auto animate-bounce mb-2" />
              <h3 className="text-sm font-bold tracking-widest uppercase opacity-75">
                Current Streak
              </h3>
              <div className="text-5xl font-black mt-1 tracking-tight flex items-center justify-center gap-1">
                {daysCompleted} <span className="text-4xl text-amber-300">🔥</span>
              </div>
              <p className="text-xs font-semibold mt-3 opacity-90">
                {daysCompleted >= 75 ? "You completed the challenge!" : `${75 - daysCompleted} days remaining to finish!`}
              </p>
            </div>

            {/* XP and Level Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 text-primary p-2.5 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 fill-primary/30" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-primary tracking-wider uppercase">
                      Level {currentLevel}
                    </h3>
                    <p className="text-sm font-extrabold text-secondary">
                      {getLevelName(currentLevel)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-400 block uppercase">
                    Score
                  </span>
                  <span className="text-lg font-black text-primary">
                    {daysCompleted * 100} XP
                  </span>
                </div>
              </div>

              {/* XP progress bar for level */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-gray-400">
                  <span>Level Progress</span>
                  <span>{daysCompleted % 10} / 10 days</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${(daysCompleted % 10) * 10}%` }}
                  />
                </div>
              </div>
            </div>

          </aside>
        </div>

        {/* Achievements Card - Full Width */}
        <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
            <Trophy className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-extrabold text-primary">
              Achievements & Milestones
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {achievements.map((item) => {
              const unlocked = daysCompleted >= item.target;
              return (
                <div 
                  key={item.id}
                  className={`relative p-4 rounded-2xl border text-center transition-all ${
                    unlocked ? 
                    'bg-emerald-50/40 border-emerald-150 shadow-md shadow-emerald-500/5' : 
                    'bg-gray-50/50 border-gray-100 opacity-60'
                  }`}
                >
                  <div className="text-3xl mb-2 filter drop-shadow-sm select-none">
                    {unlocked ? item.icon : "🔒"}
                  </div>
                  <h3 className="text-sm font-extrabold text-primary leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-[10px] font-semibold text-secondary mt-1 leading-snug">
                    {item.desc}
                  </p>
                  <div className="mt-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      unlocked ? 
                      'bg-emerald-100 text-emerald-800' : 
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {unlocked ? "Unlocked" : `Day ${item.target}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {showMarkDayAsCompletedModal && (
          <MarkDayAsCompleted
            setShowModal={setShowMarkDayAsCompletedModal}
            onConfirm={handleMarkDayAsCompleted}
          />
        )}
        {showRulesModal && (
          <RulesModal
            setShowModal={setShowRulesModal}
          />
        )}
        {showResetConfirmModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 max-w-md w-11/12 shadow-2xl space-y-4">
              <h3 className="text-xl font-extrabold text-primary">
                Reset Challenge? ⚠️
              </h3>
              <p className="text-secondary text-sm font-semibold leading-relaxed">
                Are you sure you want to reset your entire challenge and clear all your progress? This action is permanent and cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  className="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-secondary text-sm font-semibold transition-all duration-200 cursor-pointer"
                  onClick={() => setShowResetConfirmModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all duration-200 shadow-md shadow-red-500/10 cursor-pointer"
                  onClick={() => {
                    const previousGoals = localStorage.getItem("goals");
                    localStorage.clear();
                    if (previousGoals) {
                      localStorage.setItem("goals", previousGoals);
                    }
                    window.location.reload();
                  }}
                >
                  Yes, Reset Challenge
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

ProgressBar.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default ProgressBar;
