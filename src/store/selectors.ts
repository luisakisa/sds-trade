import { authSelectors } from "./auth/selectors";
import { lotsSelectors } from "./lots/selectors";
import { supplierPropertiesSelectors } from "./supplierProperties/selectors";

const ReduxSelectors = {
  AuthSelectors: authSelectors,
  SupplierPropertiesSelectors: supplierPropertiesSelectors, 
  LotsSelectors: lotsSelectors,
};

export default ReduxSelectors;
