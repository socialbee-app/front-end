import React, { useEffect, useState } from "react";
import axios from "axios";

// Components
import PostCard from "../components/PostCard";
import Profile from "../components/Profile";

// Material-UI
import Grid from "@material-ui/core/Grid";

export default function Home() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios
      .get("/posts")
      .then(res => {
        setPosts([...res.data]);
      })
      .catch(err => console.log(err));
  }, []);

  const recentPosts = posts ? (
    posts.map((post, i) => (
      <PostCard post={post} key={i}>
        {post.body}
      </PostCard>
    ))
  ) : (
    <Profile />
  );
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentPosts}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
}
