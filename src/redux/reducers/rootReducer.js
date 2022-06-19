import { combineReducers } from "redux";
import studentReducer from "./studentReducer";
import studentSlice from "./studentSlice";

const rootReducer = combineReducers({
  studentReducer,
  studentSlice,
});
export default rootReducer;
