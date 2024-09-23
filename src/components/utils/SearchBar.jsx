// SearchBar.js
export const SearchBar = () => {
  return (
    <div className="relative -mt-8 mx-auto w-3/4 max-w-lg flex shadow-lg">
      <input
        type="text"
        placeholder="Where you want to go"
        className="w-full px-4 py-2 rounded-l-full border-2 border-[#002b54] focus:outline-none"
      />
      <button className="bg-[#ff8c00] hover:bg-[#ff9900] text-white font-semibold px-6 py-2 rounded-r-full">
        Search
      </button>
    </div>
  );
};
