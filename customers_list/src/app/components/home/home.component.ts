import { Component, OnInit } from '@angular/core';
import { showSpinner, listCount } from '../home/state/list.selectors';

import { Store } from '@ngrx/store';
import { ApiUserService } from 'src/app/shared/user/api.service';
import { setCustomers, setSpinner } from './state/list.action';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showSpinner: boolean = true;
  listCount!: number;

  constructor(private api: ApiUserService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(listCount).subscribe((res) => {
      this.listCount = res;
    });

    this.store.select(showSpinner).subscribe((res) => {
      this.showSpinner = res;
    });

    this.api.getCustomers().subscribe((list: any) => {
      this.store.dispatch(setCustomers({ data: list }));
      this.store.dispatch(setSpinner({ data: false }));
    });
  }
}
