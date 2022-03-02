import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Classes } from 'src/app/courses/services/Classes.model';
import * as ClassAction from '../../../courses/classes/store/class-list.Actions';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(
    private store : Store<{ClassesList : Array<Classes>}>
  ) { }

  ngOnInit(): void {
  }

}
