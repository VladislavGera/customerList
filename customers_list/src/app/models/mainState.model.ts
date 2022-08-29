import { CustomerState } from './customer.model';

export interface SetFilter {
  status: boolean;
  filterBy: string;
}

export interface SetSort {
  status: boolean;
  sortBy: string;
}

export interface MainState {
  customersList: CustomerState[];
  filter: SetFilter;
  sort: SetSort;
  page: number;
  pageSize: number;
  listCount: number;
  showSpinner: boolean;
}
