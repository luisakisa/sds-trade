import  { ThunkMiddleware, thunk } from "redux-thunk";
import ReduxActions from "./actions";
import ReduxSelectors from "./selectors";
import { Middleware, applyMiddleware, createStore } from "redux";
import reducer from "./reducer";
import { persistStore } from "redux-persist";

const store = createStore(reducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof reducer>;

export const persistor = persistStore(store);

export default store;
export type AppDispatch = typeof store.dispatch;

export const Redux = {
  Actions: ReduxActions,
  Selectors: ReduxSelectors,
};
