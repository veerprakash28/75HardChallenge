import { Github, Flame } from "lucide-react";

const Header = () => {
  const githubURL = "https://github.com/veerprakash28";
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-150 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-primary text-white p-2 rounded-xl shadow-md shadow-primary/20 flex items-center justify-center">
            <Flame className="w-6 h-6 text-orange-400 fill-orange-400" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight text-primary leading-none">
              75 HARD
            </h1>
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase block mt-0.5">
              Challenge Tracker
            </span>
          </div>
        </div>

        {/* GitHub Link */}
        <a
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 shadow-sm"
          href={githubURL}
          target="_blank"
          rel="noreferrer"
        >
          <Github className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-secondary hidden sm:inline">
            veerprakash28
          </span>
        </a>
      </div>
    </header>
  );
};

export default Header;
