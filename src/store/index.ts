import  { ThunkMiddleware, thunk } from "redux-thunk";
import ReduxActions from "./actions";
import ReduxSelectors from "./selectors";
import { Middleware, applyMiddleware, createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof reducer>;

export default store;
export type AppDispatch = typeof store.dispatch;

export const Redux = {
  Actions: ReduxActions,
  Selectors: ReduxSelectors,
};
