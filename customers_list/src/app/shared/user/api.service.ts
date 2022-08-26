import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
// https://dev-test-api.rinternal.com/Customer/GetCustomers  // GET
// https://dev-test-api.rinternal.com/Customer/CreateCustomer // POST
// https://dev-test-api.rinternal.com/Customer/UpdateCustomer // GET
// https://dev-test-api.rinternal.com/Customer/UpdateCustomer // POST
// https://dev-test-api.rinternal.com/Customer/DeleteCustomers // POST
export class ApiUserService {
  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get<any>(
      'https://dev-test-api.rinternal.com/Customer/GetCustomers'
    );
  }
  createCustomer(data: any) {
    return this.http
      .post<any>(
        'https://dev-test-api.rinternal.com/Customer/CreateCustomer',
        data
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  getUpdateCustomer(data: any) {
    return this.http.get<any>(
      'https://dev-test-api.rinternal.com/Customer/UpdateCustomer'
    );
  }
  updateCustomer(data: any) {
    return this.http
      .post<any>(
        `https://dev-test-api.rinternal.com/Customer/UpdateCustomer`,
        data
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  deleteCustomer(data: any) {
    return this.http
      .post<any>(
        'https://dev-test-api.rinternal.com/Customer/DeleteCustomers',
        data
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
