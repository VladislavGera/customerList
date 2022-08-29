import { createReducer, on, Action } from '@ngrx/store';
import {
  setCustomers,
  setFilter,
  setSort,
  setSpinner,
  removeSetting,
  setPageNumber,
} from './list.action';
import { initialState } from './list.state';

const _customerReducer = createReducer(
  initialState,
  on(setCustomers, (state, action) => {
    return {
      ...state,
      customersList: action.data,
      listCount: action.data.length,
      page: 1,
    };
  }),
  on(setSpinner, (state, action) => {
    return {
      ...state,
      showSpinner: action.data,
    };
  }),
  on(setSort, (state: any, action) => {
    return {
      ...state,
      sort: { status: true, sortBy: action.data },
      filter: { status: false, filterBy: '' },
      page: 1,
    };
  }),
  on(setFilter, (state: any, action) => {
    return {
      ...state,
      filter: { status: true, filterBy: action.data },
      sort: { status: false, sortBy: '' },
      page: 1,
    };
  }),
  on(removeSetting, (state) => {
    return {
      ...state,
      filter: { status: false, filterBy: '' },
      sort: { status: false, sortBy: '' },
      page: 1,
    };
  }),
  on(setPageNumber, (state: any, action) => {
    return {
      ...state,
      page: action.data,
    };
  })
);

export function customerReducer(state: any, action: Action) {
  return _customerReducer(state, action);
}
