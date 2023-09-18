import React, { useEffect, useState, useMemo } from 'react';
import { YOUTUBE_VIDEO_API } from '../utils/constants';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ButtonList from './ButtonList';

const SearchVideoContainer = () => {
    const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [videos, setVideos] = useState([]);
  const suggestion = useSelector((store) => store.search.clickedSuggestion);

  const getVideos = async () => { 
    try {
      const data = await fetch(YOUTUBE_VIDEO_API);
    const responseJson = await data.json();
    console.log(responseJson.items);
    setVideos(responseJson.items);
    } catch (error) {
      console.log(error.message)
    }
  }; 

  const filterVideos = useMemo(() => {
    const queryWords = suggestion?.toLowerCase().split(' ').filter(word => word.trim() !== '');
  
    return videos?.filter((video) => {
      const videoTitle = video?.snippet?.title?.toLowerCase();
  
      return queryWords.every(queryWord => videoTitle.includes(queryWord));
    });
  }, [videos,suggestion]);

  useEffect(() => {
    getVideos();
    console.log("rererendreing")
  }, []);

  return (
    <div className={isMenuOpen?'col-span-11 ml-[16.2rem]':"ml-10"}>
        <ButtonList/>
        <div className='flex flex-wrap mt-36' >
      {/* {filterVideos?.[0] && <ModifiedVideoCard info={filterVideos[0]} name="modifiedcard using HOC" />} */}
      {filterVideos?.length !== 0 ? (
        filterVideos?.map((video) => (
          <Link key={video?.id} to={'/watch?v=' + video?.id}>
            <VideoCard info={video} />
          </Link>
        ))
      ) : (
        <p className='font-bold'> Oops!!! No videos found</p>
      )}
    </div>
    </div>
  );
};

export default SearchVideoContainer;