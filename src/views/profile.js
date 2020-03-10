import React, { useEffect, useState } from "react";
import axios from "axios";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getProfileData } from "../redux/actions/dataActions";

// Components
import PostCard from "../components/post/PostCard";
import StaticProfile from "../components/profile/StaticProfile";
import PostSkeleton from "../util/PostSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

// Material UI
import Grid from "@material-ui/core/Grid";

const Profile = props => {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const UI = useSelector(state => state.UI);

  const [profile, setProfile] = useState({
    profileData: null,
    postIdParam: null
  });

  useEffect(() => {
    // Grabs profile of the user whose profile you're visiting
    const username = props.match.params.username;

    const postId = props.match.params.postId;

    if (postId) {
      setProfile({
        postIdParam: postId
      });
    }

    dispatch(getProfileData(username));

    axios
      .get(`/user/${username}`)
      .then(res => {
        setProfile({ profileData: res.data.user });
      })
      .catch(err => console.log(err));
  }, []);

  const postsList = data.loading ? (
    <PostSkeleton />
  ) : data.posts === null ? (
    <p>This user has no posts</p>
  ) : !profile.postIdParam ? (
    data.posts.map((post, i) => {
      return (
        <PostCard
          key={i}
          post={post}
          user={user}
          UI={UI}
          dispatch={dispatch}
          {...props}
        />
      );
    })
  ) : (
    data.posts.map((post, i) => {
      if (post.postId !== profile.postIdParam) {
        return (
          <PostCard
            key={i}
            post={post}
            user={user}
            UI={UI}
            dispatch={dispatch}
            {...props}
          />
        );
      } else {
        return (
          <PostCard
            key={i}
            post={post}
            user={user}
            UI={UI}
            dispatch={dispatch}
            {...props}
          />
        );
      }
    })
  );
  return (
    <Grid container spacing={2}>
      <Grid item sm={4} xs={12}>
        {profile.profileData === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
      <Grid item sm={8} xs={12}>
        {postsList}
      </Grid>
    </Grid>
  );
};

export default Profile;
