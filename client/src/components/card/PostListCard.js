import React, { useState } from 'react';
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { ReadOutlined, MessageOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';

const PostListCard = () => {
  const [loading, setLoading] = useState(true);

  const onChange = () => {
    setLoading(!loading);
  };

  return (
    <>
      <Switch checked={!loading} onChange={onChange} />

      <Card
        // style={{ width: 300, marginTop: 16 }}
        style={{ width: '80%', marginTop: 16, margin: 'auto' }}
        actions={[
          <MessageOutlined key="comment" />,
          <ReadOutlined key="readMore" />,
        ]}
      >
        <Skeleton loading={loading} active>
          <Meta
            title="post Author"
            description="This is the description of the post"
          />
        </Skeleton>
      </Card>
    </>
  );
};

export default PostListCard;
