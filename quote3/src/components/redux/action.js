export const SET_USERNAME = "SET_USERNAME";
export const SET_PROFILE_PICTURE = "SET_PROFILE_PICTURE";
export const SET_BIOGRAPHY = "SET_BIOGRAPHY";
export const SET_ALIAS = "SET_ALIAS";
export const SET_MY_ID = "SET_MY_ID";

export const setUsername = (username) => ({
  type: SET_USERNAME,
  payload: username,
});

export const setProfilePicture = (profilePicture) => ({
  type: SET_PROFILE_PICTURE,
  payload: profilePicture,
});

export const setBiography = (biography) => ({
  type: SET_BIOGRAPHY,
  payload: biography,
});

export const setAlias = (alias) => ({
  type: SET_ALIAS,
  payload: alias,
});

export const setMyId = (alias) => ({
  type: SET_MY_ID,
  payload: alias,
});
