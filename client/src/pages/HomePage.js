import React, { useEffect, useReducer, useState } from 'react';
import PostList from '../components/post/PostList';
import PostListCard from '../components/card/PostListCard';
import PostContext from '../contexts/post/PostContext';
import { postListReducer } from '../reducers/postReducer';
import { getAllPostApi } from '../apis/postApis';

const initialState = {
  posts: [],
};

const HomePage = () => {
  const [state, dispatch] = useReducer(postListReducer, initialState);

  const contextValue = {
    posts: state.posts,
  };

  const { loading, error, posts } = state;

  useEffect(() => {
    getAllPostApi()(dispatch);
  }, []);

  return (
    <>
      <PostContext.Provider value={contextValue}>
        <div className="container">
          {loading ? (
            <h3>loading</h3>
          ) : error ? (
            <h3>{error}</h3>
          ) : (
            <div>
              {posts.map((post) => (
                <PostListCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </PostContext.Provider>
    </>
  );
};

export default HomePage;
