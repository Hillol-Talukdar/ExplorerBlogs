import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../constants/userConstants';
import { toast } from 'react-toastify';

export const loginApi =
  (authcontext, userName, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const config = {
        Headers: {
          'content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/user/login`,
        { userName, password },
        config
      );

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(data.token));
      authcontext.login();
      toast.success('Welcome to Explorer blog again!');
    } catch (error) {
      // console.log('ERRR: ', error);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );

      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logoutApi = (authContext) => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('token');
  authContext.logout();
  dispatch({ Type: USER_LOGOUT });
};
