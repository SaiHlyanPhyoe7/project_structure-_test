import React from "react";
import axios from "axios";
import { useQuery } from "@/hooks/useQuery";

const FetchJsonPlaceholder = () => {
  const queryKey = "posts";

  // const { data } = useQuery("/posts", {});
  const { data } = useQuery<any>(`/posts`);

  console.log("data is ", data);

  // const fetchPosts = async () => {
  //   const response = await axios.get(
  //     "https://jsonplaceholder.typicode.com/posts"
  //   );
  //   return response.data;
  // };

  // Fetch data using useQuery hook
  // const {
  //   isPending,
  //   isError,
  //   data: posts,
  //   error,
  // } = useQuery({
  //   queryKey: [queryKey],
  //   queryFn: fetchPosts,
  // });

  // if (isPending) {
  //   return <span>Loading...</span>;
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>;
  // }

  // Display the list of posts
  return (
    <div>
      <h1>Post List</h1>
      <ul>
        {/* {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default FetchJsonPlaceholder;
