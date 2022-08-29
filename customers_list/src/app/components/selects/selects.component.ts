import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setFilter } from 'src/app/components/home/state/list.action';
import { setSort } from 'src/app/components/home/state/list.action';
import { removeSetting } from 'src/app/components/home/state/list.action';

@Component({
  selector: 'app-selects',
  templateUrl: './selects.component.html',
  styleUrls: ['./selects.component.css'],
})
export class SelectsComponent {
  selected: string = '';
  date: string = '';

  constructor(private store: Store<AppState>) {}

  setFilter(picker: any) {
    this.date = picker._model.selection;

    this.store.dispatch(setFilter({ data: this.date }));
  }

  setSort(selected: string) {
    this.selected = selected;
    this.store.dispatch(setSort({ data: this.selected }));
  }

  removeSetting() {
    this.store.dispatch(removeSetting());
    this.selected = '';
    this.date = '';
  }
}
