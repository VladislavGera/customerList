import { createReducer, on, Action } from '@ngrx/store';
import {
  setCustomers,
  setFilter,
  setSort,
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
    };
  }),
  on(setSort, (state: any, action) => {
    return {
      ...state,
      sort: { status: true, sortBy: action.data },
      filter: { status: false, filterBy: '' },
    };
  }),
  on(setFilter, (state: any, action) => {
    return {
      ...state,
      filter: { status: true, filterBy: action.data },
      sort: { status: false, sortBy: '' },
    };
  }),
  on(removeSetting, (state) => {
    return {
      ...state,
      filter: { status: false, filterBy: '' },
      sort: { status: false, sortBy: '' },
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
