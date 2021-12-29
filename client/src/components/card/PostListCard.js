import React from 'react';
import { Card } from 'antd';
import { ReadOutlined, MessageOutlined } from '@ant-design/icons';

const PostListCard = ({ post }) => {
  return (
    <>
      <Card
        title={post.title}
        extra={post.author.name}
        style={{
          width: '80%',
          margin: 'auto',
          marginTop: 16,
        }}
        actions={[
          <MessageOutlined key="comment" />,
          <ReadOutlined key="readMore" />,
        ]}
      >
        <p>{post.description}</p>
      </Card>
    </>
  );
};

export default PostListCard;
