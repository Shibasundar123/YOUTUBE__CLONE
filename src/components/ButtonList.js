import React, { useState,useEffect } from "react";
import Button from "./Button";
import '../style.css'
import { useSelector } from "react-redux";

const list = [
  "All",
  "Gaming",
  "Songs",
  "Live",
  "Soccer",
  "Cricket",
  "News",
  "Cooking",
  "Valentines",
  "Virat Kohli",
  "Movies",
  "Kiarastomi",
  "Bollywood music",
  "Reviews",
  "Trailers",
  "Kollywood",
  "Gaming",
  "Songs",
  "Live",
  "Soccer",
  "Cricket",
  "News",
  "Cooking",
  "Valentines",
  "Virat Kohli",
  "Movies",
  "Kiarastomi",
  "Bollywood music",
  "Reviews",
  "Trailers",
  "Kollywood",
  "Gaming",
  "Songs",
  "Live",
  "Soccer",
  "Cricket",
  "News",
  "Cooking",
  "Valentines",
  "Virat Kohli",
  "Movies",
  "Kiarastomi",
  "Bollywood music",
  "Reviews",
  "Trailers",
  "Kollywood",
];

const ButtonList = () => {
  const [itemsPerPage, setItemsPerPage] = useState(1); // Initialize with 1
  const [currentPage, setCurrentPage] = useState(0);
  const maxPages = Math.ceil(list.length / itemsPerPage);
  const themeChanger = useSelector(store=>store.theme.isDark)


  const updateItemsPerPage = () => {
    const containerWidth = window.innerWidth;
    const itemsPerRow = Math.floor(containerWidth / 150); // Assuming each button is 150px wide
    setItemsPerPage(itemsPerRow);
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleClickNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPages - 1));
  };
  const contentMargin = 50;

  const containerWidth = 12// Add this line to calculate container width
  const translateValue = -currentPage * (containerWidth / itemsPerPage);

  const startIdx = currentPage * itemsPerPage;
  const visibleItems = list.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className={`carousel flex mt-20 fixed ${themeChanger?'bg-black':'bg-white'}  w-full`}> 
      <div className="arrows flex relative">
        <div className="prev-button-container">
          <button className=" text-white h-12 w-12 rounded-full" onClick={handleClickPrev} hidden={currentPage === 0}>
            <img className="h-8 ml-3 mt-2 opacity-90" src="https://cdn-icons-png.flaticon.com/128/318/318477.png" alt="" />
          </button>
        </div>
        <div className="carousel-content relative">
          <div
            className={`carousel-overlay-left absolute top-0 left-0 h-full ${
              currentPage === 0 ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ width: `${contentMargin}px` }}
          ></div>
          <div
          
            className={`carousel-overlay-right absolute top-0 right-0 h-full ${
              currentPage === maxPages - 1 ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ width: `${contentMargin}px` }}
          ></div>
          {visibleItems.map((item, index) => (
            <Button key={index} name={item} />
          ))}
        </div>
        <div className="next-button-container relative top-1/2 right-0 transform -translate-y-1/2 ml-[30px]">
          <button className=" text-white h-12 w-12 rounded-full" onClick={handleClickNext} hidden={currentPage === maxPages - 1}>
           <img src="https://cdn-icons-png.flaticon.com/128/318/318476.png" className="h-8 mt-2 opacity-90" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonList;
