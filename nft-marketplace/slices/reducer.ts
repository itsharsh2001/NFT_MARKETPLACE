import { combineReducers } from "redux";
import userReducer from "./userReducer";
import web3Reducer from "./web3Reducer";

const rootReducer = combineReducers({
  user: userReducer,
  web3Provider: web3Reducer,
});

export default rootReducer;
