import React from 'react';
import { Card } from 'antd';
import { ReadOutlined, MessageTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './PostListCard.css';

const PostListCard = ({ post }) => {
  return (
    <>
      <Card
        title={post.title}
        extra={post.author.name}
        style={{
          // width: '80%',
          margin: 'auto',
          marginTop: 16,
        }}
        className="postListCard"
        actions={[
          <MessageTwoTone key="comment" />,

          <Link to={`/post/${post._id}`}>
            <ReadOutlined key="readMore" style={{ color: '#1890FF' }} />
          </Link>,
        ]}
      >
        {post.description.length > 100 ? (
          <>
            <p>{post.description.substring(0, 300)}......</p>
            <Link to={`/post/${post._id}`}>Read More</Link>
          </>
        ) : (
          <p>{post.description}</p>
        )}
      </Card>
    </>
  );
};

export default PostListCard;
