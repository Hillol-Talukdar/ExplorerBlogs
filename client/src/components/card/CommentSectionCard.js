import { Card } from 'antd';
import React, { useContext } from 'react';
import PostDetailsContext from '../../contexts/post/PostDetailsContext';
import './CommentSectionCard.css';

const CommentSectionCard = ({ comment }) => {
  // const { post } = useContext(PostDetailsContext);

  return (
    <>
      <Card
        title={comment.author?.name}
        extra={`${comment.createdAt?.substr(11, 5)}, ${comment.createdAt?.substr(0, 10)}`}
        size="small"
        type="inner"
        style={{
          margin: '0 auto',
          marginTop: 16,
        }}
        // className="commentSectionCard"
      >
        <p>{comment.description}</p>
      </Card>
    </>
  );
};

export default CommentSectionCard;
