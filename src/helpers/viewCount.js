 export function formatViewCount(viewCount) {
    if (viewCount >= 1000000) {
        // If the view count is in millions or more, format as "X M views"
        return (viewCount / 1000000).toFixed(1) + 'M views';
    } else if (viewCount >= 1000) {
        // If the view count is in thousands or more, format as "X K views"
        return (viewCount / 1000).toFixed(1) + 'K views';
    } else {
        // If the view count is less than 1000, leave it as is
        return viewCount + ' views';
    }
}