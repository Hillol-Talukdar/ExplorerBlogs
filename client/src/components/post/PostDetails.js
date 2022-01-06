import React from 'react';
import './PostDetails.css';

const PostDetails = ({ post }) => {
  return (
    <div className="postDetailsBody">
      <div className="p-3">
        <h2 className="postDetailsTitle">{post.title}</h2>

        <div className="d-flex flex-row postDetailsAuthor">
          <div>Posted by:&nbsp;</div>
          <div>
            <b>{post.author?.name}</b>
          </div>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <div>
            Posted at: {post.createdAt?.substr(11, 5)},{' '}
            {post.createdAt?.substr(0, 10)}
          </div>

          <div>,&nbsp;&nbsp;</div>

          <div>
            Last updated: {post.updatedAt?.substr(11, 5)},{' '}
            {post.updatedAt?.substr(0, 10)}
          </div>
        </div>

        <hr />

        <div className="postDetailsDescription">{post.description}</div>
      </div>
    </div>
  );
};

export default PostDetails;
