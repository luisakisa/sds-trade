import {auth} from './auth/reducer';
import { lots } from './lots/reducer';

const ReduxActions = {
  Auth: auth.actions,
  Lots: lots.actions,
};

export default ReduxActions;
