export const UPDATE_MY_PROFILE = "UPDATE_MY_PROFILE";
export const RESET_MY_PROFILE = "RESET_MY_PROFILE";

export const updateMyProfile = (profileUpdates) => ({
  type: UPDATE_MY_PROFILE,
  payload: profileUpdates,
});

export const resetMyProfile = () => ({
  type: RESET_MY_PROFILE,
});
