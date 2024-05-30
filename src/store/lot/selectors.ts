import { List } from 'interfaces/lots';
import {RootState} from '../index';

const getState = (state: RootState): List=> state.list;

export const lotSelectors = {
  getState,
};
