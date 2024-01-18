import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatChipSet,MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent {

  @Input() options: any[] = [];
  @Input() selectedValues: string[] = [];
  @Input() defaultOption!: string;
  @Input() statusCounts :any[]=[]

  @Output() selectedOption = new EventEmitter<string>();

  @ViewChild('chipList') chipList!: MatChipSet;
  defaultChip: any;
  selectedValue!: string;
  select: any;

  ngAfterViewInit() {
    this.defaultChip = this.options.find(option => option.value === this.defaultOption);
    if (this.defaultChip) {
      this.defaultChip.selected = true;
      this.emitSelectedOption(this.defaultChip.value);
    }
    console.log('Received statusCounts:', this.statusCounts);

  }
  refreshData() {
    // Unselect all chips
    this.options.forEach(option => {
      option.selected = false;
    });
  
    // Select the "Pending" chip
    const pendingChip = this.options.find(option => option.value === 'Pending');
    if (pendingChip) {
      pendingChip.selected = true;
      this.emitSelectedOption('Pending');
    }
  }
  
  
  toggleSelection(option: any): void {
    option.selected = !option.selected;
    console.log(option.value);
    
    this.emitSelectedOption(option.value);
  }

  emitSelectedOption(selectedValue: string): void {
    console.log(selectedValue);

  this.selectedValue = selectedValue 
     
    this.selectedOption.emit(selectedValue);
  }


}
