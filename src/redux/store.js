import thunk from "redux-thunk" 
import { createStore,applyMiddleware,compose  } from "redux";

import reducers from "./reducers/index";
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {},
  storeEnhancers(applyMiddleware(thunk))
);

export default store;
