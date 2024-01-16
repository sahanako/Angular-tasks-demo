import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';


interface Option {
  value: string;
  group: string;
  isSingleSelection: boolean;
}

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss']
})



export class FilterPageComponent {
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() options!: any[]; // Assuming options is an array of objects with a 'value' property
  @Input() isSingleSelection!: boolean;
  @Output() filterChanged: EventEmitter<any> = new EventEmitter();

  filterControl = new FormControl();

  applyFilters(): void {
    this.filterChanged.emit({ label: this.label, value: this.filterControl.value });
  }
}
