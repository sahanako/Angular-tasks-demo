import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chip-set',
  templateUrl: './chip-set.component.html',
  styleUrls: ['./chip-set.component.scss']
})
export class ChipSetComponent {
  @Input() selectedOptions!: string[];
  @Output() chipremoved = new EventEmitter<any>()


  removeChip(index: any): void {
    console.log(index);
    this.chipremoved.emit(index)
  }

}
