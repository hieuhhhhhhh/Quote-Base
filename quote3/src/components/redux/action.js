export const UPDATE_MY_PROFILE = "UPDATE_MY_PROFILE";
export const RESET_MY_PROFILE = "RESET_MY_PROFILE";
export const UPDATE_USER_ACTIONS = "UPDATE_USER_ACTIONS";

export const updateMyProfile = (profileUpdates) => ({
  type: UPDATE_MY_PROFILE,
  payload: profileUpdates,
});

export const resetMyProfile = () => ({
  type: RESET_MY_PROFILE,
});

export const updateUserActions = (updates) => ({
  type: UPDATE_USER_ACTIONS,
  payload: updates,
});
