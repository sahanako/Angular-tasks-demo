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
    const removedValue = this.selectedOptions[index];
    console.log(removedValue);
  
    if (removedValue !== undefined && removedValue !== "") {
      // Remove the chip only if the value is not undefined or empty
      this.selectedOptions.splice(index, 1);
      this.chipremoved.emit(index);
    }
  }

}
