import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { Link, useSearchParams } from "react-router-dom";
import CommentsContainer from "./commentsContainer";
import LiveChat from "./LiveChat";
import { YOUTUBE_VIDEO_API, YOUTUBE_VIDEO_BY_ID } from "../utils/constants";
import { formatViewCount } from "../helpers/viewCount";
// import ButtonList from "./ButtonList";
import { getTimeAgo } from "../helpers/timeAgo";



const WatchPage = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [videoData, setVideoData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  // const [videoId,setVideoId]= useState(null)

  // console.log("isMenuOpen - ",isMenuOpen)

  let [searchParams] = useSearchParams();
  const videoId = searchParams.get('v')
  const getSpecificVideoData = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEO_BY_ID + videoId);
    const response = await data.json();
    setVideoData(response?.items?.[0]);
    } catch (error) {
      console.log(error.message)
    }
  };

  const getRelatedVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEO_API);
    const response = await data.json();
    setRelatedVideos(response?.items);
    } catch (error) {
      console.log(error.message)
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
     getSpecificVideoData()
    getRelatedVideos();
   
    dispatch(closeMenu());
  }, [videoId]);
  return (
    <div className="flex  w-[100%] overflow-hidden">
      <div className="flex flex-col mt-[100px] ml-3 w-2/3">
        <div>
          <iframe
            className="rounded-xl mb-10 "
            width="550"
            height="300"
            src={
              "https://www.youtube.com/embed/" + videoData?.id + "?autoplay=1;"
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="mb-2 w-[500px]">
          <p className="font-bold text-lg">{videoData?.snippet?.title}</p>
          <div className="flex mt-1">
            <img
              className="mt-2 h-12 w-12 rounded-3xl"
              src={videoData?.snippet?.thumbnails?.medium?.url}
              alt=""
            />
            <div className="mt-2 ml-3">
              <p className=" text-md font-bold">
                {videoData?.snippet?.channelTitle}
              </p>
              <p className="text-sm font-semibold text-gray-500">79.2K</p>
            </div>
            <div className="ml-5 mt-2">
              <button className="bg-black text-white font-semibold px-4 py-2 rounded-3xl">
                Subscribe
              </button>
            </div>
            <div className="mt-2 ml-17">
              <button className="bg-gray-100 flex  font-semibold px-4 py-2 rounded-3xl">
                <img
                  className="h-6 w-6"
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOiBub25lOyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsiPjxwYXRoIGQ9Ik0xOC43NywxMWgtNC4yM2wxLjUyLTQuOTRDMTYuMzgsNS4wMywxNS41NCw0LDE0LjM4LDRjLTAuNTgsMC0xLjE0LDAuMjQtMS41MiwwLjY1TDcsMTFIM3YxMGg0aDFoOS40MyBjMS4wNiwwLDEuOTgtMC42NywyLjE5LTEuNjFsMS4zNC02QzIxLjIzLDEyLjE1LDIwLjE4LDExLDE4Ljc3LDExeiBNNywyMEg0di04aDNWMjB6IE0xOS45OCwxMy4xN2wtMS4zNCw2IEMxOC41NCwxOS42NSwxOC4wMywyMCwxNy40MywyMEg4di04LjYxbDUuNi02LjA2QzEzLjc5LDUuMTIsMTQuMDgsNSwxNC4zOCw1YzAuMjYsMCwwLjUsMC4xMSwwLjYzLDAuMyBjMC4wNywwLjEsMC4xNSwwLjI2LDAuMDksMC40N2wtMS41Miw0Ljk0TDEzLjE4LDEyaDEuMzVoNC4yM2MwLjQxLDAsMC44LDAuMTcsMS4wMywwLjQ2QzE5LjkyLDEyLjYxLDIwLjA1LDEyLjg2LDE5Ljk4LDEzLjE3eiIvPjwvc3ZnPg=="
                  alt=""
                />
                <p className=" pr-2 border-black border-r-2">
                  {Math.floor(videoData?.statistics?.likeCount / 1000)}K
                </p>
                <img
                  className="h-6 w-6 ml-5 mr-4 "
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBmb2N1c2FibGU9ImZhbHNlIiBzdHlsZT0icG9pbnRlci1ldmVudHM6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyI+PHBhdGggZD0iTTE3LDRoLTFINi41N0M1LjUsNCw0LjU5LDQuNjcsNC4zOCw1LjYxbC0xLjM0LDZDMi43NywxMi44NSwzLjgyLDE0LDUuMjMsMTRoNC4yM2wtMS41Miw0Ljk0QzcuNjIsMTkuOTcsOC40NiwyMSw5LjYyLDIxIGMwLjU4LDAsMS4xNC0wLjI0LDEuNTItMC42NUwxNywxNGg0VjRIMTd6IE0xMC40LDE5LjY3QzEwLjIxLDE5Ljg4LDkuOTIsMjAsOS42MiwyMGMtMC4yNiwwLTAuNS0wLjExLTAuNjMtMC4zIGMtMC4wNy0wLjEtMC4xNS0wLjI2LTAuMDktMC40N2wxLjUyLTQuOTRsMC40LTEuMjlIOS40Nkg1LjIzYy0wLjQxLDAtMC44LTAuMTctMS4wMy0wLjQ2Yy0wLjEyLTAuMTUtMC4yNS0wLjQtMC4xOC0wLjcybDEuMzQtNiBDNS40Niw1LjM1LDUuOTcsNSw2LjU3LDVIMTZ2OC42MUwxMC40LDE5LjY3eiBNMjAsMTNoLTNWNWgzVjEzeiIvPjwvc3ZnPg=="
                  alt=""
                />
              </button>
            </div>
            <div className=" ml-5 mt-2 ">
              <button className="bg-gray-100 font-semibold px-5 py-2 flex  rounded-3xl">
                <img
                  className="h-6 w-6"
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBmb2N1c2FibGU9ImZhbHNlIiBzdHlsZT0icG9pbnRlci1ldmVudHM6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyI+PHBhdGggZD0iTTE1IDUuNjMgMjAuNjYgMTIgMTUgMTguMzdWMTRoLTFjLTMuOTYgMC03LjE0IDEtOS43NSAzLjA5IDEuODQtNC4wNyA1LjExLTYuNCA5Ljg5LTcuMWwuODYtLjEzVjUuNjNNMTQgM3Y2QzYuMjIgMTAuMTMgMy4xMSAxNS4zMyAyIDIxYzIuNzgtMy45NyA2LjQ0LTYgMTItNnY2bDgtOS04LTl6Ii8+PC9zdmc+"
                  alt=""
                />
                <span className="ml-2">Share</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex">
          <div>
            <div className="p-3 ml-3 w-[500px] bg-gray-100 mb-4    rounded-2xl">
              <div className="flex">
                <p className="font-semibold">
                  {Math.floor(videoData?.statistics?.viewCount / 1000000)}M
                  views
                </p>
                <p className="font-semibold ml-2">
                  {getTimeAgo(videoData?.snippet?.publishedAt)}
                </p>
              </div>
              <div>
                <p className=" text-gray-800">
                  {videoData?.snippet?.description
                    .split(" ")
                    .slice(0, 15)
                    .join(" ") + "...More"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[700px] text-sm">
          <CommentsContainer
            totalComments={videoData?.statistics?.commentCount}
            videoId={videoData?.id}
          />
        </div>
      </div>

      <div className="mt-[100px] ml-[-60px]">
        <div className="h-[600px] ">
          {relatedVideos.map((videoData) => (
            <Link key={videoData?.id} to={"/watch?v=" + videoData?.id}>
              <div className="flex max-w-full mt-3">
                <img
                  className="rounded-lg h-[94px] w-[168px]"
                  src={videoData?.snippet?.thumbnails?.medium?.url}
                  alt=""
                />
                <div className="ml-3 text-sm font-bold">
                  <p className="font-semibold ">
                    {videoData?.snippet?.title
                      .split(" ")
                      .slice(0, 5)
                      .join(" ") + "..."}
                  </p>
                  <p className="mt-1 text-xs text-gray-900 ">
                    {videoData?.snippet?.channelTitle}
                  </p>
                  <div className="flex mt-1 text-[10px]">
                    <p className="font-semibold">
                      {formatViewCount(videoData?.statistics?.viewCount)}
                    </p>
                    <p className="font-semibold ml-2">
                      {getTimeAgo(videoData?.snippet?.publishedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
