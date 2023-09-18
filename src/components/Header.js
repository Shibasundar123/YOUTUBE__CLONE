import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {toggleMenu} from '../utils/appSlice.js'
import { YOUTUBE_SEARCH_API } from '../utils/constants.js'
import { cachedResults,searchSuggestion } from '../utils/searchSlice.js'
import { Link, useNavigate } from 'react-router-dom'
import { changeTheme } from '../utils/themeSlice.js'



const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const suggestion = useSelector((store) => store.search.clickedSuggestion);
  const [searchQuery,setSearchQuery] = useState("")
  const [suggestions,setSuggestions] = useState([])
  const [inputValue,setInputValue] = useState("")
  
  const searchCache = useSelector(store=>store.search.cachedSuggestions)
  const themeChanger = useSelector(store=>store.theme.isDark)

  

  useEffect(()=>{
    //debouncing using useffect and settimeout in react also highly optimized search using cache it will not make api calls for
    // those search queries which already made api calls
   const timer = setTimeout(()=>{
   if (searchCache?.[searchQuery]){
    setSuggestions(searchCache[searchQuery])
   }
   else{
    getSearchSuggestions()
   }
  },200)
    return ()=>{
      clearTimeout(timer)
    }
  
  },[searchQuery])


  const suggestionOnclick = (clickedSuggestion) =>{
    dispatch(searchSuggestion(clickedSuggestion))
    setInputValue(clickedSuggestion)
    setSuggestions('')
    setSearchQuery('')
   
    
  }
 
  

  const getSearchSuggestions = async () => {
  
    try {
      const data = await fetch(YOUTUBE_SEARCH_API + searchQuery)
    const response = await data.json()
    setSuggestions(response[1])
    dispatch(cachedResults({
     searchQuery:searchQuery,
     response:response[1]
    }))
    } catch (error) {
      console.log(error.message)
    }
    
  }

  const handleToggleMenu = () =>{
     dispatch(toggleMenu())
  }
  return (
    <div
      className={`grid grid-flow-col p-5 z-10 fixed w-full ${
        themeChanger ? "bg-black text-white" : "bg-white"
      }`}
    >
      <div className="flex col-span-1">
        <img
          onClick={() => {
            handleToggleMenu();
          }}
          className={
            !themeChanger
              ? "h-8 cursor-pointer"
              : "mb-2 h-8 w-16 -ml-2 cursor-pointer"
          }
          src={
            !themeChanger
              ? "https://icons.veryicon.com/png/o/miscellaneous/linear-icon-45/hamburger-menu-5.png"
              : "https://www.atulhost.com/wp-content/uploads/2023/01/animated-hamburger-menu-icon-300x169.png"
          }
          alt="menu"
        />
        <Link to="/">
          <img
            className="h-15 mx-10  -my-1 "
            src="data:image/png;base64,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"
            alt="yotube logo"
          />
        </Link>
      </div>
      <div className="mx-80 col-span-10 w-3/4 justify-center">
        <div>
          <input
            typeof="text"
            value={inputValue}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setInputValue(e.target.value);
              // dispatch(searchSuggestion(searchQuery))
            }}
            className={`w-1/2 h-10 border ${
              !themeChanger ? "border-gray-400" : "border-gray-600 bg-gray-800"
            } rounded-l-full  pl-5`}
            type="text"
          />
          <button
            className={`px-5 h-10 absolute  border ${
              !themeChanger
                ? "border-gray-400 rounded-r-full bg-gray-100"
                : "border-gray-700 rounded-r-full bg-gray-900"
            }`}
          >
            <img
              className="h-6"
              src={
                !themeChanger
                  ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOiBub25lOyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsiPjxwYXRoIGQ9Im0yMC44NyAyMC4xNy01LjU5LTUuNTlDMTYuMzUgMTMuMzUgMTcgMTEuNzUgMTcgMTBjMC0zLjg3LTMuMTMtNy03LTdzLTcgMy4xMy03IDcgMy4xMyA3IDcgN2MxLjc1IDAgMy4zNS0uNjUgNC41OC0xLjcxbDUuNTkgNS41OS43LS43MXpNMTAgMTZjLTMuMzEgMC02LTIuNjktNi02czIuNjktNiA2LTYgNiAyLjY5IDYgNi0yLjY5IDYtNiA2eiIvPjwvc3ZnPg=="
                  : "https://www.citypng.com/public/uploads/preview/search-explore-white-icon-transparent-png-31634946340qymsafkpk6.png?v=2023082801"
              }
              alt=""
            />
          </button>
        </div>
        {suggestions.length !== 0 && searchQuery?.length !== 0 ? (
          <div className="mt-2 fixed bg-white shadow-xl  z-50  py-2  rounded-2xl w-[31rem]">
            <ul>
              {suggestions.map((s) => (
                <Link to={"/results?search_query=" + s.replace(/\s+/g, "+")}>
                  {" "}
                  <li
                    key={s}
                    onClick={() => suggestionOnclick(s)}
                    className="py-2 cursor-pointer font-semibold px-5 hover:bg-gray-100 flex "
                  >
                    <img
                      className="h-5 mt-1"
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTAwJSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxMDAlIj48dXNlIGNsYXNzPSJ5dHAtc3ZnLXNoYWRvdyIgeG1sbnM6bnMxPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBuczE6aHJlZj0iI3l0cC1pZC0yNyIvPjxwYXRoIGNsYXNzPSJ5dHAtc3ZnLWZpbGwiIGQ9Ik0yMC44NywyMC4xN2wtNS41OS01LjU5QzE2LjM1LDEzLjM1LDE3LDExLjc1LDE3LDEwYzAtMy44Ny0zLjEzLTctNy03cy03LDMuMTMtNyw3czMuMTMsNyw3LDdjMS43NSwwLDMuMzUtMC42NSw0LjU4LTEuNzEgbDUuNTksNS41OUwyMC44NywyMC4xN3ogTTEwLDE2Yy0zLjMxLDAtNi0yLjY5LTYtNnMyLjY5LTYsNi02czYsMi42OSw2LDZTMTMuMzEsMTYsMTAsMTZ6IiBpZD0ieXRwLWlkLTI3Ii8+PC9zdmc+"
                      alt=""
                    />
                    <span className="ml-2">{s}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex gap-6">
        <div className="h-[40px] w-[40px]">
          <button
            className=""
            onClick={() => {
              dispatch(changeTheme());
            }}
          >
            <img
              className=" rounded-full"
              src="https://uploads.commoninja.com/searchengine/wordpress/wp-dark-mode.gif"
              alt=""
            />
          </button>
        </div>

        <div className="col-span-1 h-[40px] w-[40px]">
          <img
            className=" rounded-full"
            src="https://media.licdn.com/dms/image/D5603AQEcTG01nTsXfw/profile-displayphoto-shrink_800_800/0/1684657605849?e=2147483647&v=beta&t=Pa90-hLz33dQJjtJi3ML_o6946qbYSvdhi3SAYUL9Sw"
            alt="user icon"
          />
        </div>
      </div>
    </div>
  );
}

export default Header
