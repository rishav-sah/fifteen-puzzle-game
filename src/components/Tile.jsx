const Tile = ({ value, onClick }) => (
  <div
    className={`w-20 h-20 text-2xl font-bold flex justify-center items-center rounded-lg select-none cursor-pointer bg-[#FFFFA5] transition-all duration-300 ease-in-out ${
      value === 0 ? "bg-red-400" : ""
    }`}
    onClick={onClick}
  >
    {value !== 0 ? value : ""}
  </div>
);

export default Tile;
