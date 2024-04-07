import {RootState} from '../index';
import {Auth} from './reducer';

const getState = (state: RootState): Auth => state.auth;

export const authSelectors = {
  getState,
};
