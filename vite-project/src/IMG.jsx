import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const IMG = () => {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notfound, setNotFound] = useState(false); // Changed the state name to camelCase
  const [Page, setPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);

  const searchInput = useRef(null);
  const IMAGE_PER_PAGE = 28;
  const API = "https://api.unsplash.com/search/photos";
  const API_KEY = "SymcQPB6PMfFjjcnxoiE9FGZo09Vw5ZgZqiMFnqBBaA";

  const resetSearch=()=>{
    setPage(1);
    fatchAPI();
  }
  const handleSearch = (event) => {
    event.preventDefault();
    resetSearch();
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
resetSearch();
  };

  const fatchAPI =useCallback( async () => {
    try {
      const res = await axios.get(
        `${API}?page=${Page}&query=${searchInput.current.value}&client_id=${API_KEY}&page=1&per_page=${IMAGE_PER_PAGE}&client_id=${API_KEY}`
      );
    console.log(res.data)
      setResult(res.data.results);
      setIsLoading(false);
      settotalPages(res.data.total_pages);
      setNotFound(res.data.results.length === 0); // Check if results are empty
    } catch (error) {
      setIsLoading(false);

      setNotFound(true); // Set not found if there's an error
      console.log(error);
    }
  },[Page]);

  useEffect(() => {
    fatchAPI(API);
  },[Page, fatchAPI]);
  // console.log("page",Page)
  return (
    <div className="">
      {isLoading ? (
        <p className="text-center text-3xl font-semibold mt-96">Loading...</p>
      ) : (
        <div>
          <nav className="z-10 w-[100%] fixed top-0 h-20 bg-slate-800 flex items-center justify-between pl-10 pr-10">
            <p className="text-3xl font-semibold text-sky-100 cursor-pointer font-sans">Artify</p>
            <form
              onSubmit={handleSearch}
              className="border-2 rounded border-slate-300  pl-4  h-14 w-2/3  flex items-center"
            >
              <FaSearch className="text-2xl text-slate-300 cursor-pointer" />
              <input      
                type="search"
                className="placeholder:text-sky-100 placeholder:font-semibold h-14 w-[100%] pl-4 pr-2 text-lg text-sky-100  outline-none bg-transparent"
                placeholder="Search your Favourites......"
                ref={searchInput}
              />
            </form>
          </nav>
          <div>
            <div className="text-center">
              
              <p className="text-[60px] text-slate-800 font-bold mb-8 mt-24">
                Find Your Favourite Images
              </p>

              <div className="flex mt-6 justify-center">
                <div
                  onClick={() => handleSelection("Nature")}
                  className="mr-8 bg-slate-800 pl-4 pr-4 pt-2 pb-2 rounded text-white font-semibold cursor-pointer"
                >
                  Nature
                </div>
                <div
                  onClick={() => handleSelection("Birds")}
                  className="mr-8 bg-slate-800 pl-4 pr-4 pt-2 pb-2 rounded text-white font-semibold cursor-pointer"
                >
                  Birds
                </div>
                <div
                  onClick={() => handleSelection("Foods")}
                  className="mr-8 bg-slate-800 pl-4 pr-4 pt-2 pb-2 rounded text-white font-semibold cursor-pointer"
                >
                  Foods
                </div>
                <div
                  onClick={() => handleSelection("Coding")}
                  className="mr-8 bg-slate-800 pl-4 pr-4 pt-2 pb-2 rounded text-white font-semibold cursor-pointer"
                >
                  Coding
                </div>
              </div>

              {/* Render message if no images found */}
              {notfound && (
                <div className="text-slate-800 text-3xl font-semibold mt-60">
                  No images found
                </div>
              )}

              {/* Render images if found */}
              {!notfound && (
                <Link to = {`/IMG/${IMG.id}`}>
                <div className="flex flex-wrap justify-center mt-6 ">
                {result.map((image) => (
               <img
               key={image.id}
               id={image.id}
               src={image.urls.small}
               alt={image.alt_description}
               className="rounded-lg m-2 object-cover cursor-pointer hover:animate-pulse"
             />
                ))}
              </div>
              </Link>
              )}
              {!notfound && (
                <div className="mt-20 mb-20">
                  {Page > 1 && (
                    <button
                      onClick={() => setPage(Page - 1)}
                      className=" bg-slate-800 pl-6 pr-6 pt-4 pb-4 mr-10 rounded text-white font-semibold cursor-pointer"
                    >
                      Previous
                    </button>
                  )}
                  {Page < totalPages && (
                    <button
                      onClick={() => setPage(Page + 1)}
                      className="mr-4 bg-slate-800 pl-6 pr-6 pt-4 pb-4 ml-10 rounded text-white font-semibold cursor-pointer"
                    >
                      Next
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IMG;
