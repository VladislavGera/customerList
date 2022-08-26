import { CustomerState } from './customer.model';

export interface CustomerReq {
  element: CustomerState;
  status: string;
}
