import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { ApiUserService } from 'src/app/shared/user/api.service';
import { setCustomers } from './state/list.action';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  listCount!: number;

  constructor(private api: ApiUserService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.api.getCustomers().subscribe((list: any) => {
      this.listCount = list.length;
      this.store.dispatch(setCustomers({ data: list }));
    });
  }
}
