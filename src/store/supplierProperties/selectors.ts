import {RootState} from '../index';
import {SupplierProperties, supplierProperties} from './reducer';

const getState = (state: RootState): SupplierProperties => state.supplierProperties;

export const supplierPropertiesSelectors = {
  getState,
};
