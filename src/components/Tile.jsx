// Stateless functional component for individual puzzle tiles
const Tile = ({ value, onClick }) => (
  // Render the tile with dynamic styling based on its value
  <div
    className={`w-20 h-20 text-2xl font-bold flex justify-center items-center rounded-lg select-none cursor-pointer bg-[#FFFFA5] transition-all duration-300 ease-in-out ${
      value === 0 ? "bg-red-400" : "" // Apply a different background if the tile value is 0, indicating an empty space
    }`}
    onClick={onClick} // Handle click events passed from the parent component
  >
    {/* Display the value unless it is 0, in which case display nothing (for the empty tile) */}
    {value !== 0 ? value : ""}
  </div>
);

// Export the Tile component to be used in other parts of the application
export default Tile;
