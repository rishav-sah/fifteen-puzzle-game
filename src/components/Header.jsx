const Header = ({ moves, time, onStartPause, onReset, isRunning }) => {
  const formattedTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-full md:w-6/12 m-auto">
      <div className="pt-4 pb-4 flex flex-col md:flex-row items-center justify-center">
        <div className="w-60">
          <div className="flex justify-between mb-2">
            <div className="py-2 px-5 bg-blue-200 text-center rounded-md">
              <span className="block">MOVES</span>
              <span className="block">{moves}</span>
            </div>
            <div className="py-2 px-5 bg-blue-200 text-center rounded-md">
              <span className="block">TIME</span>
              <span className="block">{formattedTime()}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              className={`py-2 px-4 ml-1 ${
                isRunning ? "bg-red-500" : "bg-green-500"
              } text-white rounded-md cursor-pointer`}
              onClick={onStartPause}
            >
              {isRunning ? "PAUSE" : "START"}
            </button>
            <button
              className="py-2 px-4 mr-1 bg-red-200 text-center rounded-md hover:bg-red-300 cursor-pointer"
              onClick={onReset}
            >
              RESET
            </button>
          </div>
        </div>
        <div className="ml-8 text-[40px] font-bold text-center">
          <h1>FIFTEEN PUZZLE</h1>
          <h1>GAME</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;