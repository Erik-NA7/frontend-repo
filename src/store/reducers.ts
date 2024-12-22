import { UserActionTypes, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE } from './actions';

interface UserState {
  loading: boolean;
  success: boolean | null;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  success: null,
  error: null,
};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case UPDATE_USER_FAILURE:
      return { ...state, loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
