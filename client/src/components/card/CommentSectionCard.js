import React, { useContext } from 'react';
import PostDetailsContext from '../../contexts/post/PostDetailsContext';

const CommentSectionCard = () => {
  const { post } = useContext(PostDetailsContext);

  return <div>hello</div>;
};

export default CommentSectionCard;
