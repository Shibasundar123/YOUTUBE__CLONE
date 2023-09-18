import React from 'react'
import { useSelector } from 'react-redux';
import { getTimeAgo } from '../helpers/timeAgo';
import { formatViewCount } from '../helpers/viewCount';

const VideoCard = ({info}) => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const themeChanger = useSelector(store=>store.theme.isDark)
        const {snippet,statistics} = info
    const {thumbnails,title,channelTitle} = snippet
  
  return (
    <div
      className={`p-2 shadow-lg rounded-lg gap-3  ${
        isMenuOpen ? "w-[200px]  " : "w-[250px]  mx-auto"
      }`}
    >
      <img
        className="rounded-lg w-full "
        src={thumbnails?.medium?.url}
        alt="thumbnail"
      />
      <ul>
        <div className="flex  mt-2">
          <img
            className="w-10 h-10  rounded-full"
            src={snippet?.thumbnails?.high?.url}
            alt=""
          />
          <div className="ml-3">
            <li className={`font-bold text-sm ${themeChanger ? "text-white" : ""} `}>
              {info?.snippet?.title.split(" ").slice(0, 3).join(" ") + "..."}
            </li>
            <li className=" text-gray-500 text-sm font-semibold">{info?.snippet?.channelTitle.split(" ").slice(0, 1).join(" ") + "..."}</li>
            <div className="flex text-gray-500  text-xm font-semibold gap-2">
              <p className='text-xs'>{formatViewCount(statistics?.viewCount)}</p>
              <p className=" text-xs">{getTimeAgo(snippet?.publishedAt)}</p>
            </div>
            <li></li>
          </div>
        </div>
      </ul>
    </div>
  );
}
// using higher order components for learning purpose
// const ModifiedVideoCard = ({info,name}) => {
//   return(
//     <div className='p-1 m-1 border border-red-600'>
//     <VideoCard info={info} name={name} />
//   </div>
//   )
// }

export default VideoCard
// export {ModifiedVideoCard}

