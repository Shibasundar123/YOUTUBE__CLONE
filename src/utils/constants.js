
export const API_KEY = 'AIzaSyB_n95ssBIvqPjqPJvZa4txWH9dqpJZJ3g'
export const LIVE_CHAT_COUNT = 30

export const YOUTUBE_VIDEO_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${API_KEY}` 
export const YOUTUBE_VIDEO_BY_ID = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${API_KEY}&id=`
export const YOUTUBE_SEARCH_API = 'http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q='
export const YOUTUBE_COMMENTS_API = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&key=${API_KEY}&videoId=`
export const YOUTUBE_SHORTS_API="https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&type=video&videoDuration=short&key=" +
API_KEY +
"&q=trendingshorts";
export const CATEGROIES = "https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=AIzaSyBKhmoGWpk4KYCFFvJpFZUQvHXfWvvwpMQ"
