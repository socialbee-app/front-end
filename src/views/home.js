import React, { useEffect, useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

// Components
import PostCard from "../components/PostCard";
import Profile from "../components/Profile";

// Material-UI
import Grid from "@material-ui/core/Grid";

const Home = () => {
  const loading = useSelector(state => state.data.loading);
  const posts = useSelector(state => state.data.posts);
  const likes = useSelector(state => state.user.likes);
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const recentPosts = !loading ? (
    posts.map((post, i) => (
      <PostCard
        post={post}
        key={i}
        likes={likes}
        isAuthenticated={user.isAuthenticated}
        user={user}
        dispatch={dispatch}
      >
        {post.body}
      </PostCard>
    ))
  ) : (
    <p>Loading...</p>
  );
  return (
    <Grid container spacing={2}>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
      <Grid item sm={8} xs={12}>
        {recentPosts}
      </Grid>
    </Grid>
  );
};

export default Home;
