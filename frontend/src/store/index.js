import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import employeesReducer from './employees/employeesReducer';

const rootReducer = combineReducers({
  employees: employeesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;