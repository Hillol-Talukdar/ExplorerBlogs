import { useContext } from 'react';
import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../constants/userConstants';

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

      localStorage.setItem('userInfo', JSON.stringify(data));
      authcontext.login();
    } catch (error) {
      console.log('ERRR: ', error);
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
