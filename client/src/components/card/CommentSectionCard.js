import React, { useReducer } from 'react';
import { Card, Modal, Form, Input } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import './CommentSectionCard.css';
import { deleteMyCommentApi, updateMyCommentApi } from '../../apis/commentApis';
import {
  commentDeleteReducer,
  commentUpdateReducer,
} from '../../reducers/commentReducer';

const initialState = {};

const CommentSectionCard = ({ comment }) => {
  const [form] = Form.useForm();

  const [state, dispatch] = useReducer(commentDeleteReducer, initialState);
  const [updateCommentState, updateCommentDispatch] = useReducer(
    commentUpdateReducer,
    initialState
  );

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo'))
    : '';

  const onSubmit = () => {
    form.validateFields().then((values) => {
      updateMyCommentApi(
        comment._id,
        values.description
      )(updateCommentDispatch);
    });
  };

  const deleteModal = () => {
    Modal.confirm({
      title: 'Are you sure to delete this comment?',
      icon: <ExclamationCircleOutlined />,
      okType: 'danger',
      okText: 'Yes',
      cancelText: 'No',

      onOk() {
        deleteMyCommentApi(comment._id)(dispatch);
      },

      onCancel() {},
    });
  };

  const updateModal = () => {
    Modal.confirm({
      title: 'Edit comment?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Update',

      content: (
        <>
          <Form name="CommentForm" className="m-3" form={form}>
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Enter your comment...',
                },
              ]}
            >
              <Input.TextArea rows={4} defaultValue={comment.description} />
            </Form.Item>
          </Form>
        </>
      ),

      onOk() {
        onSubmit();
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
            <EditOutlined id="commentEditIcon" onClick={updateModal} />

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
