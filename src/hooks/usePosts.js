import { useMemo } from "react";
export const useSportedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    console.log("Function work");
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts;
  }, [sort, posts]);
  return sortedPosts;
};
export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSportedPosts(posts, sort);
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedPosts]);
  return sortedAndSearchedPosts;
};
