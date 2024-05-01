import { Auth } from 'interfaces/auth';
import {RootState} from '../index';

const getState = (state: RootState): Auth => state.auth;

export const authSelectors = {
  getState,
};
