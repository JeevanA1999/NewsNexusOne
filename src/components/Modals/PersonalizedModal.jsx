/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedCat } from "../../Store/itemsSlice";

export default function PersonalizedModal({
  personalizedModal,
  handlePersonalizationModal,
}) {
  const dispatch = useDispatch();

  // State to manage checkbox selections
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);

  // Example data for categories, authors, and sources
  const categories = [
    "World news",
    "Sports",
    "Science",
    "Business ",
    "Entertainment",
  ];
  const authors = [
    "David Gilbert",
    "Jess Weatherbed",
    "David Johnson",
    "Emily Davis",
    "Vittoria Elliott",
    "Mary Kekatos",
    "Al Jazeera",
  ];
  const sources = [
    "Wired",
    "The Verge",
    "ABC News",
    "The Guardian",
    "The New York Times",
  ];

  // Handle checkbox change for categories
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((category) => category !== value)
        : [...prevSelected, value]
    );
  };

  // Handle checkbox change for authors
  const handleAuthorChange = (e) => {
    const value = e.target.value;
    setSelectedAuthors((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((author) => author !== value)
        : [...prevSelected, value]
    );
  };

  // Handle checkbox change for sources
  const handleSourceChange = (e) => {
    const value = e.target.value;
    setSelectedSources((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((source) => source !== value)
        : [...prevSelected, value]
    );
  };

  // Handle "Done" button click
  const handleDone = () => {
    const selectedItems = {
      categories: selectedCategories.map((category) => category.toLowerCase()),
      authors: selectedAuthors.map((author) => author.toLowerCase()),
      sources: selectedSources.map((source) => source.toLowerCase()),
    };

    console.log("Selected Items:", selectedItems);
    dispatch(setSelectedCat(selectedItems));
    handlePersonalizationModal();
  };

  return (
    <div>
      {personalizedModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg  p-4 flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-center">
              Personalized News
            </h2>
            <div className=" flex md:flex-row  flex-col  md:gap-2">
              {/* News Categories Section */}
              <div className="flex flex-col space-y-2 ">
                <h3 className="font-semibold">Categories</h3>
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={category}
                      onChange={handleCategoryChange}
                      checked={selectedCategories.includes(category)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">{category}</span>
                  </label>
                ))}
              </div>

              {/* Authors Section */}
              <div className="flex flex-col space-y-2">
              <h3 className="font-semibold">Authors</h3>
                {authors.map((author) => (
                  <label
                    key={author}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={author}
                      onChange={handleAuthorChange}
                      checked={selectedAuthors.includes(author)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">{author}</span>
                  </label>
                ))}
              </div>

              {/* News Sources Section */}
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold">Sources</h3>
                {sources.map((source) => (
                  <label
                    key={source}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={source}
                      onChange={handleSourceChange}
                      checked={selectedSources.includes(source)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">{source}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handleDone}
                className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700"
              >
                Done
              </button>
              <button
                onClick={handlePersonalizationModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
