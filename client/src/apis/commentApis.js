import axios from 'axios';
import {
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_CREATE_FAIL,
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

    const { data } = axios.post(
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
  } catch (error) {
    dispatch({
      type: COMMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
