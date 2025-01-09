import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSearchFeild, toggleSearch } from "../../Store/searchSlice";
import { setDefaultGeneral, setDefaultDate } from "../../Store/itemsSlice";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // Initially empty

  const dispatch = useDispatch();

  useEffect(() => {
    // Get current date
    const currentDate = new Date();

    // S 7 days from the current date
    currentDate.setDate(currentDate.getDate() - 7);

    // date as YYYY-MM-DD
    const oneWeekAgo = currentDate.toISOString().split("T")[0];

    // Set the date to one week ago
    setSelectedDate(oneWeekAgo);
  }, []);
  const handleSearch = () => {
    if (!searchTerm && !selectedDate) {
      alert("Please enter a search term or select a date.");
      return;
    }

    // Dispatch the search field to searchSlice
    dispatch(setSearchFeild({ searchTerm, selectedDate }));

    // Update defaultGeneral and defaultDate in itemsSlice
    dispatch(setDefaultGeneral(searchTerm || "General")); // Fallback to "General" if searchTerm is empty
    dispatch(setDefaultDate(selectedDate || new Date().toISOString().split("T")[0])); // Fallback to current date

    // Optionally close the search bar
    dispatch(toggleSearch());
  };

  return (
    <div className="max-w-lg mx-auto mb-8 px-4">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-white p-4 rounded-lg shadow-md">
        {/* Date Picker */}
        <div className="w-full sm:w-auto">
          <input
            required
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-auto flex-1">
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Button */}
        <div className="w-full sm:w-auto">
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none flex items-center justify-center"
          >
            <FaSearch size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
