import { Form, Button, Input, Descriptions } from 'antd';
import React, { useContext, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { addCommentApi } from '../../apis/commentApis';
import PostDetailsContext from '../../contexts/post/PostDetailsContext';
import { commentCreateReducer } from '../../reducers/commentReducer';
import CommentSectionCard from '../card/CommentSectionCard';
import './CommentSection.css';

const initialState = {
  comment: {},
};

const CommentSection = () => {
  const { post } = useContext(PostDetailsContext);

  const [state, dispatch] = useReducer(commentCreateReducer, initialState);
  const { loading, comment, error } = state;

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo'))
    : '';

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const onFinish = (values) => {
    addCommentApi(values.description, post._id)(dispatch);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h5 className="mt-4">{post.comments?.length} Comments:</h5>

      {post.comments?.map((comment) => (
        <CommentSectionCard key={comment._id} comment={comment} />
      ))}

      <div className="commentSectionPostCommentContainer">
        <Form
          name="CommentForm"
          className="m-3"
          onSubmit={submitHandler}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="description">
            <Input.TextArea rows={4} placeholder="Enter your comment..." />
          </Form.Item>

          <Form.Item className="text-center">
            {userInfo ? (
              <Button id="commentSectionBtn" htmlType="submit">
                Post Comment
              </Button>
            ) : (
              <Link to="/login">
                <Button id="commentSectionBtn">Log in Post Comment</Button>
              </Link>
            )}
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CommentSection;
