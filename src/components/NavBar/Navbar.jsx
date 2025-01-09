import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllSources,
  selectGeneralItems,
  setDefaultSource,
  setDefaultGeneral,
} from "../../Store/itemsSlice";
import "../../App.css";
import PersonalizedModal from "../Modals/PersonalizedModal";

const Navbar = () => {
  const dispatch = useDispatch(); // Initialize useDispatch

  const [isOpen, setIsOpen] = useState(true);
  const [isGeneralDropdownOpen, setIsGeneralDropdownOpen] = useState(false);
  const [isAllSourceDropdownOpen, setIsAllSourceDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [personalizedModal, setPersonalizedModal] = useState(false);

  const defaultGeneral = useSelector((state) => state.items.defaultGeneral);
  const defaultSource = useSelector((state) => state.items.defaultSource);

  const [generalSelection, setGeneralSelection] = useState(defaultGeneral);
  const [allSourceSelection, setAllSourceSelection] = useState(defaultSource);

  const allSourceItems = useSelector(selectAllSources);
  const generalItems = useSelector(selectGeneralItems);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleGeneralSelection = (item) => {
    setGeneralSelection(item);
    dispatch(setDefaultGeneral(item)); // Update Redux store
    setIsGeneralDropdownOpen(false);
  };

  const handleAllSourceSelection = (item) => {
    setAllSourceSelection(item);
    dispatch(setDefaultSource(item)); // Update Redux store
    setIsAllSourceDropdownOpen(false);
  };

  const handlePersonalizationModal = () => {
    setPersonalizedModal(!personalizedModal);
  };

  return (
    <div
      className="w-full fixed"
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <div className="antialiased bg-gray-100 dark-mode:bg-gray-900">
        <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
          <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between p-4">
              <a
                href="/"
                className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
              >
                NewsNexus
              </a>

              <button
                className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-6 h-6"
                >
                  {!isOpen ? (
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  )}
                </svg>
              </button>
              {/* <div>
                <SearchComponent/>
              </div> */}
            </div>
            <nav
              className={`${
                isOpen ? "flex" : "hidden"
              } flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}
            >
              {/* Tabs */}
              {["Home"].map((tab) => (
                <a
                  key={tab}
                  href={tab === "Home" ? "/" : ""}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-2 mt-2 text-sm font-semibold rounded-lg ${
                    activeTab === tab
                      ? "border-b-2 border-light-blue-500 text-blue-600"
                      : "hover:bg-gray-200 hover:text-gray-900"
                  } dark-mode:bg-transparent dark-mode:text-gray-200 dark-mode:hover:bg-gray-600 dark-mode:hover:text-white md:mt-0 md:ml-4`}
                >
                  {tab}
                </a>
              ))}

              <button
                onClick={handlePersonalizationModal}
                className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                <span>Personalized News</span>
              </button>

              
              {/* All Source Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsAllSourceDropdownOpen(true)}
                onMouseLeave={() => setIsAllSourceDropdownOpen(false)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAllSourceDropdownOpen(!isAllSourceDropdownOpen);
                  }}
                  className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                >
                  <span>{allSourceSelection}</span>
                </button>
                {isAllSourceDropdownOpen && (
                  <div
                    className="absolute right-0 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg md:max-w-screen-sm md:w-screen dark-mode:bg-gray-700"
                    onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing when clicked inside
                  >
                    <div className="px-2 pt-2 pb-4">
                      <ul>
                        {allSourceItems.map((item, index) => (
                          <li
                            key={index}
                            onClick={() => handleAllSourceSelection(item)}
                            className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 dark-mode:hover:bg-gray-600 dark-mode:hover:text-white dark-mode:text-gray-200"
                          >
                            <a href="#">{item}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* General Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsGeneralDropdownOpen(true)}
                onMouseLeave={() => setIsGeneralDropdownOpen(false)}
              >
                <button
                  onClick={() =>
                    setIsGeneralDropdownOpen(!isGeneralDropdownOpen)
                  }
                  className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                >
                  <span>{generalSelection}</span>
                  
                </button>
                {isGeneralDropdownOpen && (
                  <div className="absolute right-0 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg md:max-w-screen-sm md:w-screen dark-mode:bg-gray-700">
                    <div className="px-2 pt-2 pb-4">
                      <ul>
                        {generalItems.map((item, index) => (
                          <li
                            key={index}
                            onClick={() => handleGeneralSelection(item)}
                            className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 dark-mode:hover:bg-gray-600 dark-mode:hover:text-white dark-mode:text-gray-200"
                          >
                            <a href="#">{item}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
      <PersonalizedModal
        personalizedModal={personalizedModal}
        handlePersonalizationModal={handlePersonalizationModal}
      />
    </div>
  );
};

export default Navbar;
