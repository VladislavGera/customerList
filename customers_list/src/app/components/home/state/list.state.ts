import { MainState } from 'src/app/models/mainState.model';

export const initialState: MainState = {
  customersList: [],
  filter: { status: false, filterBy: '' },
  sort: { status: false, sortBy: '' },
  page: 1,
  pageSize: 10
};
