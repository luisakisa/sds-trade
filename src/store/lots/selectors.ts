import { Lot } from 'interfaces/lots';
import {RootState} from '../index';

const getState = (state: RootState): Lot[] => state.lots;

export const lotsSelectors = {
  getState,
};
