import { authSelectors } from "./auth/selectors";
import { groupsSelectors } from "./groups/selectors";
import { lotSelectors } from "./lot/selectors";
import { lotsSelectors } from "./lots/selectors";
import { supplierPropertiesSelectors } from "./supplierProperties/selectors";

const ReduxSelectors = {
  AuthSelectors: authSelectors,
  SupplierPropertiesSelectors: supplierPropertiesSelectors, 
  LotsSelectors: lotsSelectors,
  LotSelectors: lotSelectors,
  GroupsSelectors: groupsSelectors,
};

export default ReduxSelectors;
