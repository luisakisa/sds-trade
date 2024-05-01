import { SupplierSpecialist } from 'interfaces/signUp';
import {RootState} from '../index';

const getState = (state: RootState): SupplierSpecialist => state.supplierProperties;

export const supplierPropertiesSelectors = {
  getState,
};
