const Header = ({ moves, time, onStartPause, onReset, isRunning }) => {
  // Function to format the time in a mm:ss format
  const formattedTime = () => {
    const minutes = Math.floor(time / 60); // Calculate the minutes
    const seconds = time % 60; // Calculate the seconds
    // Return formatted string, adding a leading zero to seconds if less than 10
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Render the component UI
  return (
    <div className="w-full md:w-6/12 m-auto">
      <div className="pt-4 pb-4 flex flex-col md:flex-row items-center justify-center">
        {/* Container for Moves and Time display */}
        <div className="w-60">
          <div className="flex justify-between mb-2">
            {/* Moves counter display */}
            <div className="py-2 px-5 bg-blue-200 text-center rounded-md">
              <span className="block">MOVES</span>
              <span className="block">{moves}</span>
            </div>
            {/* Timer display */}
            <div className="py-2 px-5 bg-blue-200 text-center rounded-md">
              <span className="block">TIME</span>
              <span className="block">{formattedTime()}</span>
            </div>
          </div>
          {/* Start/Pause and Reset buttons */}
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
        {/* Game title display */}
        <div className="ml-8 text-[40px] font-bold text-center">
          <h1>FIFTEEN PUZZLE</h1>
          <h1>GAME</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
