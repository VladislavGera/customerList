import { Component, OnInit, Input } from '@angular/core';
import { ApiUserService } from 'src/app/shared/user/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../dialog/dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppState } from 'src/app/store/app.state';
import { customerList } from '../home/state/list.selectors';
import { setCustomers, setPageNumber } from '../home/state/list.action';
import { CustomerState } from 'src/app/models/customer.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  displayedColumns: any[] = [
    'contactName',
    'contactTelephone',
    'creationDate',
    'email',
    'softwares',
    'id',
  ];
  customers!: CustomerState[];
  pageSize: number = 10;

  @Input() listCount!: number;

  deleteIds: number[] = [];
  dataSource = new MatTableDataSource<CustomerState>(this.customers);
  name!: string;
  pageEvent!: PageEvent;
  status!: string;
  customer: CustomerState = {
    id: 0,
    name: 'string',
    email: '',
    customerTID: 'string',
    contactName: '',
    contactTelephone: '',
    notes: 'string',
    softwares: [{ softwareId: 0 }],
  };

  constructor(
    public dialog: MatDialog,
    private api: ApiUserService,
    private store: Store<AppState>,
    private _snackBar: MatSnackBar
  ) {}

  showToastr(message: string): void {
    this._snackBar.open(message, 'Undo', {
      duration: 5000,
    });
  }

  getCustomerIds(id: number) {
    const IdsLenght = this.deleteIds.length;
    this.deleteIds = this.deleteIds.filter((item) => {
      return id !== item;
    });
    IdsLenght === this.deleteIds.length && this.deleteIds.push(id);
  }

  getPageIndex() {
    if (this.listCount > this.pageSize) {
      const page = this.pageEvent.pageIndex + 1;
      this.store.dispatch(setPageNumber({ data: page }));
    }
  }

  createCustomerHandler() {
    this.status = 'Create';
    this.openDialog(this.customer);
  }

  updateCustomerHandler(element: CustomerState) {
    this.status = 'Edit';
    this.openDialog(element);
  }

  getCutomers() {
    this.api.getCustomers().subscribe(
      (list: CustomerState[]) => {
        this.store.dispatch(setCustomers({ data: list }));
      },
      (err) => {
        this.showToastr(err.message);
      }
    );
  }

  getSoftwareIds(softwares: any[]) {
    return softwares.map((item: any) => {
      return item.softwareId;
    });
  }

  deleteUsers() {
    this.api.deleteCustomer(this.deleteIds).subscribe(
      () => {
        this.getCutomers();
      },
      (err) => {
        this.showToastr(err.message);
      }
    );
  }

  sendRequest(data: CustomerState) {
    switch (this.status) {
      case 'Edit':
        this.updateCustomer(data);
        break;
      case 'Create':
        this.createCustomer(data);
        break;

      default:
        break;
    }
  }

  openDialog(element: any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: { element, status: this.status },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        const setRequestData: CustomerState = {
          ...element,
          softwareIds: this.getSoftwareIds(element.softwares),
          ...result,
        };

        this.sendRequest(setRequestData);
      }
    });
  }

  updateCustomer(requestData: CustomerState) {
    this.api.updateCustomer(requestData).subscribe(
      () => {
        this.getCutomers();
      },
      (err) => {
        this.showToastr(err.message);
      }
    );
  }

  createCustomer(requestData: CustomerState) {
    this.api.createCustomer(requestData).subscribe(
      () => {
        this.getCutomers();
      },
      (err) => {
        this.showToastr(err.message);
      }
    );
  }

  ngOnInit() {
    this.store.select(customerList).subscribe((res) => {
      this.customers = res;
    });
  }
}
