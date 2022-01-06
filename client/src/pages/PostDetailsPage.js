import React, { useEffect, useReducer } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { postDetailsReducer } from '../reducers/postReducer';
import './PostDetailsPage.css';
import PostDetailsContext from '../contexts/post/PostDetailsContext';
import { getPostApi } from '../apis/postApis';
import PostDetails from '../components/post/PostDetails';
import CommentSectionCard from '../components/card/CommentSectionCard';

const initialState = {
  post: {},
};

const PostDetailsPage = ({ match }) => {
  const [state, dispatch] = useReducer(postDetailsReducer, initialState);

  const { loading, post, error } = state;

  const contextValue = {
    post: post,
  };

  useEffect(() => {
    getPostApi(match.params.id)(dispatch);
  }, [match]);

  return (
    <>
      <PostDetailsContext.Provider value={contextValue}>
        <div className="container">
          <Link to="/">
            <Button className="postDetailsBackBtn">Go Back</Button>
          </Link>

          {loading ? (
            <h3>loading</h3>
          ) : error ? (
            <h3>{error}</h3>
          ) : (
            <div>
              <PostDetails />

              <h5>Comments:</h5>
              <CommentSectionCard />
            </div>
          )}
        </div>
      </PostDetailsContext.Provider>
    </>
  );
};

export default PostDetailsPage;
