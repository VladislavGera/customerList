import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MainState } from 'src/app/models/mainState.model';

const getCustomerState = createFeatureSelector<MainState>('list');

const filterCustomersList = (state: any) => {
  const filterBy = state.filter.filterBy;

  let list = state.customersList.filter((item: any) => {
    const date = new Date(item.creationDate);

    return date <= filterBy;
  });

  return paginationList({
    page: state.page,
    pageSize: state.pageSize,
    list,
  });
};

const sortCustomersList = (state: MainState) => {
  const sortBy = state.sort.sortBy;

  let list = [...state.customersList].sort((a: any, b: any): any => {
    if (sortBy === 'contactName') {
      return a.contactName > b.contactName ? 1 : -1;
    }
    if (sortBy === 'creationDate') {
      return a.creationDate > b.creationDate ? 1 : -1;
    }
    if (sortBy === 'email') {
      return a.email > b.email ? 1 : -1;
    } else {
      return state.customersList;
    }
  });

  return paginationList({
    page: state.page,
    pageSize: state.pageSize,
    list,
  });
};

const paginationList = (data: any) => {
  return data.list.slice(
    (data.page - 1) * data.pageSize,
    data.page * data.pageSize
  );
};

export const customerList = createSelector(getCustomerState, (state) => {
  if (state.filter.status == false && state.sort.status == false) {
    return paginationList({
      page: state.page,
      pageSize: state.pageSize,
      list: state.customersList,
    });
  } else if (state.filter.status === true) {
    return filterCustomersList(state);
  } else if (state.sort.status === true) {
    return sortCustomersList(state);
  }
});

export const listCount = createSelector(getCustomerState, (state) => {
  return state.listCount;
});

export const showSpinner = createSelector(getCustomerState, (state) => {
  return state.showSpinner;
});
