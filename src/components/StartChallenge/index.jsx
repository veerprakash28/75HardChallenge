import { useState } from "react";
import GoalsInput from "./GoalsInput";
import RulesModal from "./RulesModal";
import img1 from "../../assets/images/start-image.png";
import { Flame, ShieldCheck, CheckSquare } from "lucide-react";

const StartChallenge = () => {
  const [showModal, setShowModal] = useState(false);
  const [showGoalsInput, setShowGoalsInput] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
      {showModal && <RulesModal setShowModal={setShowModal} />}

      {!showGoalsInput ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" />
              The Ultimate Mental Toughness Program
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-primary tracking-tight leading-[1.1]">
              Transform Your Mind & Body in <span className="text-secondary">75 Days</span>
            </h1>
            <p className="text-secondary text-base sm:text-lg font-medium leading-relaxed">
              75 Hard is a tactical guide to building extreme discipline, mental toughness, and physical grit. 75 consecutive days of daily goals, zero compromises, and zero exceptions. If you fail, you start over.
            </p>

            {/* Quick Summary of Rules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-150 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-secondary mt-0.5" />
                <div>
                  <h3 className="text-sm font-extrabold text-primary">No Excuses</h3>
                  <p className="text-xs text-gray-500 font-semibold leading-normal">One mistake resets your progress back to Day 1.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-150 shadow-sm">
                <CheckSquare className="w-5 h-5 text-secondary mt-0.5" />
                <div>
                  <h3 className="text-sm font-extrabold text-primary">Daily Checklist</h3>
                  <p className="text-xs text-gray-500 font-semibold leading-normal">Track your custom goals and checklists daily.</p>
                </div>
              </div>
            </div>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary hover:bg-primary/95 text-white font-extrabold text-sm transition-all duration-200 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => setShowGoalsInput(true)}
              >
                Set Goals & Begin 🚀
              </button>
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-secondary font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                Read Official Rules
              </button>
            </div>
          </div>

          {/* Hero Illustration Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md select-none group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/15 rounded-3xl filter blur-2xl opacity-60 group-hover:opacity-85 transition duration-700 -z-10 animate-pulse" />
              <img
                src={img1}
                alt="Start 75 Hard Challenge"
                className="w-full h-auto max-h-[350px] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Show Goals Input Section */
        <GoalsInput setShowGoalsInput={setShowGoalsInput} />
      )}
    </div>
  );
};

export default StartChallenge;
