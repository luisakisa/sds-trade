import { SupplierProperties } from 'interfaces/signUp';
import {RootState} from '../index';
import { supplierProperties} from './reducer';

const getState = (state: RootState): SupplierProperties => state.supplierProperties;

export const supplierPropertiesSelectors = {
  getState,
};
