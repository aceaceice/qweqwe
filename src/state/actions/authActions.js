import axios from "axios";
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  LOG_IN,
  LOG_IN_FAILURE,
  LOG_IN_SUCCEES,
  LOG_OUT,
} from "./types";
import instance from "../../axios";
const API_URL = process.env.REACT_APP_API_URL;
export const fetchUser = () => async (dispatch) => {
  dispatch({ type: FETCH_USER });
  try {
    const res = await instance.get("/api/current_user");
    dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
  } catch (e) {}
};
export const logIn = (email, password) => async (dispatch) => {
  dispatch({ type: LOG_IN });
  try {
    const res = await instance.post("/api/login", {
      email,
      password,
    });
    dispatch({ type: LOG_IN_SUCCEES, payload: res.data });
  } catch (e) {
    dispatch({ type: LOG_IN_FAILURE });
  }
};
export const logOut = () => async (dispatch) => {
  try {
    await instance.get("/api/logout");
    dispatch({ type: LOG_OUT });
  } catch (e) {}
};
