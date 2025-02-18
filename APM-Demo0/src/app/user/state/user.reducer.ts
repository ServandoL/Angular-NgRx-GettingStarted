import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { User } from '../user';
import * as UserActions from '../state/user.actions';
export interface UserState {
  currentUser: User;
  maskUserName: boolean;
}

const initialState: UserState = {
  currentUser: null,
  maskUserName: false,
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getCurrentUser = createSelector(
  getUserFeatureState,
  (state) => state.currentUser
);

export const getMaskUserName = createSelector(
  getUserFeatureState,
  (state) => state.maskUserName
);

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.maskUserName, (state): UserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);
