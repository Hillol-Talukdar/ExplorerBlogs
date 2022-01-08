import { Form, Button, Input } from 'antd';
import React, { useContext } from 'react';
import PostDetailsContext from '../../contexts/post/PostDetailsContext';
import CommentSectionCard from '../card/CommentSectionCard';
import './CommentSection.css';

const CommentSection = () => {
  const { post } = useContext(PostDetailsContext);

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h5 className='mt-4'>{post.comments?.length} Comments:</h5>

      {post.comments?.map((comment) => (
        <CommentSectionCard key={comment._id} comment={comment} />
      ))}

      <div className="commentSectionPostCommentContainer">
        <Form
          name="CommentForm"
          className="m-3"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="description">
            <Input.TextArea rows={4} placeholder="Enter your comment..." />
          </Form.Item>

          <Form.Item className="text-center">
            <Button id="commentSectionBtn" htmlType="submit">
              Post Comment
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CommentSection;
