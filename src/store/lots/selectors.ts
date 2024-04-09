import {RootState} from '../index';
import {Lot} from './reducer';

const getState = (state: RootState): Lot[] => state.lots;

export const lotsSelectors = {
  getState,
};
