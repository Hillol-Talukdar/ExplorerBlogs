import axios from 'axios';
import { toast } from 'react-toastify';
import {
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_CREATE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_FAIL,
} from '../constants/commentConstants';

export const addCommentApi = (description, post) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_CREATE_REQUEST });

    const token = JSON.parse(localStorage.getItem('token'))
      ? JSON.parse(localStorage.getItem('token'))
      : '';

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/comment`,
      {
        description,
        post,
      },
      config
    );

    dispatch({
      type: COMMENT_CREATE_SUCCESS,
      payload: data,
    });

    window.location.reload();

    toast.success('Comment posted successfully!');
  } catch (error) {
    toast.error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );

    dispatch({
      type: COMMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteMyCommentApi = (id) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_DELETE_REQUEST });

    const token = JSON.parse(localStorage.getItem('token'))
      ? JSON.parse(localStorage.getItem('token'))
      : '';

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${process.env.REACT_APP_API}/comment/my/${id}`, config);

    dispatch({ type: COMMENT_DELETE_SUCCESS });

    window.location.reload();
    toast.success('Comment deleted successfully!');
  } catch (error) {
    toast.error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );

    dispatch({
      type: COMMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMyCommentApi = (id, description) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_UPDATE_REQUEST });

    const token = JSON.parse(localStorage.getItem('token'))
      ? JSON.parse(localStorage.getItem('token'))
      : '';

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.patch(
      `${process.env.REACT_APP_API}/comment/my/${id}`,
      { description },
      config
    );

    dispatch({
      type: COMMENT_UPDATE_SUCCESS,
      payload: data,
    });

    window.location.reload();
    toast.success('Comment updated successfully!');
  } catch (error) {
    toast.error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );

    dispatch({
      type: COMMENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
