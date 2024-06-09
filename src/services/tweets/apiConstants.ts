export const API_URLS = {
  TIMELINE: (page: number) => `/ct-api/timeline?page=${page}`,
  LIKE_TWEET: '/ct-api/like',
  UNLIKE_TWEET: '/ct-api/unlike',
};
