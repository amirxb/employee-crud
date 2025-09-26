import { FETCH_EMPLOYEES, SET_ERROR, SET_LOADING } from './employeesActions';

const initialState = {
  list: [],
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return { ...state, list: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}