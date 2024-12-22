export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

interface UpdateUserRequestAction {
  type: typeof UPDATE_USER_REQUEST;
}

interface UpdateUserSuccessAction {
  type: typeof UPDATE_USER_SUCCESS;
}

interface UpdateUserFailureAction {
  type: typeof UPDATE_USER_FAILURE;
  payload: string;
}

// Combine action types into a union
export type UserActionTypes =
  | UpdateUserRequestAction
  | UpdateUserSuccessAction
  | UpdateUserFailureAction;

export const updateUserRequest = (): UpdateUserRequestAction => ({
  type: 'UPDATE_USER_REQUEST',
});

export const updateUserSuccess = (): UpdateUserSuccessAction => ({
  type: 'UPDATE_USER_SUCCESS',
});

export const updateUserFailure = (error: string): UpdateUserFailureAction => ({
  type: 'UPDATE_USER_FAILURE',
  payload: error,
});
