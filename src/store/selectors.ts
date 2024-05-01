import { authSelectors } from "./auth/selectors";
import { groupsSelectors } from "./groups/selectors";
import { lotsSelectors } from "./lots/selectors";
import { supplierPropertiesSelectors } from "./supplierProperties/selectors";

const ReduxSelectors = {
  AuthSelectors: authSelectors,
  SupplierPropertiesSelectors: supplierPropertiesSelectors, 
  LotsSelectors: lotsSelectors,
  GroupsSelectors: groupsSelectors,
};

export default ReduxSelectors;
