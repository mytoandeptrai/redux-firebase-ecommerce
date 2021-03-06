import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import createSagaMiddle from "redux-saga";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { persistStore } from "redux-persist";

const sagaMiddleware = createSagaMiddle();

export const middlewares = [thunk, sagaMiddleware, logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;
