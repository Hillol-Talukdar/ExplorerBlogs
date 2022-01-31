import React, { useReducer } from 'react';
import { Card, Modal } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import './CommentSectionCard.css';
import { deleteCommentApi } from '../../apis/commentApis';
import { commentDeleteReducer } from '../../reducers/commentReducer';

const initialState = {};

const CommentSectionCard = ({ comment }) => {
  const [state, dispatch] = useReducer(commentDeleteReducer, initialState);
  const { lodaing, success, error } = state;
  const { confirm } = Modal;

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo'))
    : '';

  const deleteModal = () => {
    confirm({
      title: 'Are you sure to delete this comment?',
      icon: <ExclamationCircleOutlined />,
      okType: 'danger',
      okText: 'Yes',
      cancelText: 'No',

      onOk() {
        deleteCommentApi(comment._id)(dispatch);
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

            <DeleteOutlined
              id="commentDeleteIcon"
              onClick={deleteModal}
              type="dashed"
            />
          </>
        )}
      </Card>
    </>
  );
};

export default CommentSectionCard;
