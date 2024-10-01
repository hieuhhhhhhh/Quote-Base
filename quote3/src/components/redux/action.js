import submit from "@/lib/api/submit_signup";

export const SET_USERNAME = 'SET_USERNAME';
export const SET_SUBMITOK = "SET_SUBMITOK";

export const usernameInput = (username) => ({
    type: SET_USERNAME,
    payload: username,
});

export const setSubmitOk = (submitOk) => ({
  type: SET_SUBMITOK,
  payload: submitOk,
});