import { Group } from 'interfaces/groups';
import {RootState} from '../index';

const getState = (state: RootState): Group[] => state.groups;

export const groupsSelectors = {
  getState,
};
