import { GithubIcon } from "lucide-react";

const Header = () => {
  const githubURL = "https://github.com/veerprakash28";
  return (
    <>
      <div className="flex items-end px-6 py-4 border-b border-blueGray-200 mb-5">
        <h1 className="font-bold">
          <span className="text-6xl sm:text-8xl mr-1 sm:mr-2 text-primary">
            75
          </span>
          <span className="text-2xl sm:text-4xl text-secondary">
            Hard Challenge
          </span>
        </h1>
        <a
          className="flex flex-col items-center ml-auto cursor-pointer"
          href={githubURL}
          target="_blank"
          rel="noreferrer"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex justify-center items-center">
            <GithubIcon color="white" size={36} />
          </div>
          <div className="text-secondary">veerprakash28</div>
        </a>
      </div>
    </>
  );
};

export default Header;
