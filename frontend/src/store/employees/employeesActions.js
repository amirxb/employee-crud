import * as api from '../../api/employeeApi';

// action types
export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';

// action creators
export const fetchEmployees = () => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const data = await api.getAll();
    dispatch({ type: FETCH_EMPLOYEES, payload: data });
    dispatch({ type: SET_ERROR, payload: null });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message || 'Server error' });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const createEmployee = (emp) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const data = await api.create(emp);
    // refetch
    const list = await api.getAll();
    dispatch({ type: FETCH_EMPLOYEES, payload: list });
    dispatch({ type: SET_ERROR, payload: null });
    return data;
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message || 'Server error' });
    throw err;
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const updateEmployee = (id, emp) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const data = await api.update(id, emp);
    const list = await api.getAll();
    dispatch({ type: FETCH_EMPLOYEES, payload: list });
    dispatch({ type: SET_ERROR, payload: null });
    return data;
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message || 'Server error' });
    throw err;
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    await api.remove(id);
    const list = await api.getAll();
    dispatch({ type: FETCH_EMPLOYEES, payload: list });
    dispatch({ type: SET_ERROR, payload: null });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message || 'Server error' });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};