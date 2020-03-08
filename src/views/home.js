import React, { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

// Components
import PostCard from "../components/post/PostCard";
import ProfileCard from "../components/profile/ProfileCard";

// Material-UI
import Grid from "@material-ui/core/Grid";

const Home = () => {
  const loading = useSelector(state => state.data.loading);
  const posts = useSelector(state => state.data.posts);
  const user = useSelector(state => state.user);
  const UI = useSelector(state => state.UI);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const recentPosts = !loading ? (
    posts.map((post, i) => (
      <PostCard post={post} key={i} user={user} dispatch={dispatch} UI={UI}>
        {post.body}
      </PostCard>
    ))
  ) : (
    <p>Loading...</p>
  );
  return (
    <Grid container spacing={2}>
      <Grid item sm={4} xs={12}>
        <ProfileCard />
      </Grid>
      <Grid item sm={8} xs={12}>
        {recentPosts}
      </Grid>
    </Grid>
  );
};

export default Home;
