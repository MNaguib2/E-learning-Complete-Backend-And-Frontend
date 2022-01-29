import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
@Input() StatusCode !: Number;
@Input() Error !: string;
@Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  onClose() {
    this.close.emit();
  }
}
