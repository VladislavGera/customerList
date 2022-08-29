import { customerReducer } from '../components/home/state/list.reducer';

export interface AppState {
  list: any;
}

export const appReducer = {
  list: customerReducer,
};
