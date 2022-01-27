import React from 'react';
import { Card, Modal } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import './CommentSectionCard.css';

const CommentSectionCard = ({ comment }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo'))
    : '';

  const deleteModal = () => {
    Modal.confirm({
      title: 'Are you sure to delete this comment?',
      icon: <ExclamationCircleOutlined />,
      okType: 'danger',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  };

  return (
    <>
      <Card
        title={comment.author?.name}
        extra={`${comment.createdAt?.substr(
          11,
          5
        )}, ${comment.createdAt?.substr(0, 10)}`}
        size="small"
        type="inner"
        style={{
          margin: '0 auto',
          marginTop: 16,
        }}
      >
        <p>{comment.description}</p>

        {userInfo?._id === comment.author?._id && (
          <>
            <EditOutlined id="commentEditIcon" />

            <span>&nbsp;&nbsp;</span>

            <DeleteOutlined id="commentDeleteIcon" onClick={deleteModal} />
          </>
        )}
      </Card>
    </>
  );
};

export default CommentSectionCard;
