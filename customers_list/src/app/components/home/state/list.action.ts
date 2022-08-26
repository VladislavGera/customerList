import { createAction, props } from '@ngrx/store';
import { CustomerState } from 'src/app/models/customer.model';

export const setCustomers = createAction(
  'setCustomers',
  props<{ data: CustomerState[] }>()
);
export const setFilter = createAction('setFilter', props<{ data: string }>());
export const setSort = createAction('setSort', props<{ data: string }>());
export const removeSetting = createAction('removeSetting');
export const setPageNumber = createAction('setPageNumber', props<{ data: number }>());

