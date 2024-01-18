import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDateRangePicker, MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceComponent } from 'src/app/services/service.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  filterConfigs = [
    { label: 'Gender', placeholder: 'Select genders', options: ['male','female'], isSingleSelection: false },
    { label: 'Project', placeholder: 'Select projects', options: ['project1','project2','project3','none'], isSingleSelection: true },
    { label: 'Domain', placeholder: 'Select domains', options: ['Frontend','Backend'], isSingleSelection: false },
    { label: 'Date', placeholder: 'Select date range', options: ['last 30 days','last 60 days','last 90 days','custom date'], isSingleSelection: true }
  ];
  @Output() filterChanged = new EventEmitter<any>();
  @Input() dataSource : any
  filterForm!: FormGroup;
  filteredData: any;
  originalData!: any[];
  selectedFilters: any;
startDate: any;
endDate: any;
  option: any;
  startdate!: number;
  currentdate!: Date;

  constructor(private fb: FormBuilder,private user: ServiceComponent) {
    this.createFilterForm();
  }
  ngOnInit() {
    // Initialize originalData with the original data
    this.originalData = [...this.user.userdata];
    console.log(this.originalData);
    
    // Set the initial dataSource
    this.dataSource = [...this.originalData];
  }
  showFilterCard = false;

  toggleFilterCard() {
    this.showFilterCard = !this.showFilterCard;
  }
  
  createFilterForm() {
    const formGroup: { [key: string]: any } = {};
    this.filterConfigs.forEach(config => {
      formGroup[config.label.toLowerCase()] = [''];
    });
    this.filterForm = this.fb.group(formGroup);
  }
 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('picker') dateRangePicker!: MatDateRangePicker<Date>;

  onSelectOpenedChange(isOpened: boolean) {
    console.log(this.option);
    
    if (isOpened && this.option?.date === 'custom date') {
      // Open the date range picker programmatically
      this.dateRangePicker?.open();
    }
  }

  applyFilters() {
    let filteredData = this.user.userdata;
   const selectedOptions = this.filterForm.value;
   this.option = selectedOptions
    console.log(selectedOptions);
    this.selectedFilters = [];
    
    if (Object.values(selectedOptions).every(option => !option)) {
      this.dataSource = [...this.originalData];
      return;
    }
    for (const key in selectedOptions) {
      if (selectedOptions.hasOwnProperty(key)) {
        const value = selectedOptions[key];
    
        if (Array.isArray(value) && value.length > 0) {
          this.selectedFilters = this.selectedFilters.concat(value.map(item => item));
          if(this.selectedFilters?.length <0){
          }
        } else if (value !== undefined && value !== null && value !== '') {
          this.selectedFilters.push(value);
        } 
      }
    }
    const currentDate = new Date();
    let startDate: Date | null;
    let endDate: Date | null;
    switch (selectedOptions.date) {
      case 'last 30 days':
        startDate = new Date(currentDate);
       this.startdate =  startDate.setDate(currentDate.getDate() - 30);
       this.currentdate = currentDate
        console.log(startDate);
        
        break;
      case 'last 60 days':
        startDate = new Date(currentDate);
       this.startdate =  startDate.setDate(currentDate.getDate() - 60); 
       this.currentdate = currentDate
        console.log(startDate);
        
        break;
      case 'last 90 days':
        startDate = new Date(currentDate);
       this.startdate = startDate.setDate(currentDate.getDate() - 90);
       this.currentdate = currentDate
       console.log(this.startDate);
       
        break;
        case 'custom date':
           startDate = this.startDate;
           endDate = this.endDate;
           console.log(startDate);
           console.log(endDate);
           
           
                  break;
      default:
        break;
    }

    filteredData = filteredData.filter(
      (user) =>
        (selectedOptions.gender.length === 0 ||
          selectedOptions.gender.includes(user.gender)) &&
        (selectedOptions.domain.length === 0 ||
          selectedOptions.domain.includes(user.domain)) &&
        (!selectedOptions.project || selectedOptions.project.includes(user.project))&&
        this.isDateRange(user.dob,startDate!,endDate!)
          
    );
  
    this.dataSource = filteredData;
  
    console.log(filteredData, this.dataSource);
    this.filterChanged.emit(this.dataSource);
  }

  isDateRange(date: Date, startDate: Date | null, endDate: Date | null): boolean {
    
    if (!startDate && !endDate) {
      return true;
    }
  
    const dateToCheck = new Date(date);    
  
    if (startDate && dateToCheck < startDate) {
      return false; 
    }

    if (endDate && dateToCheck > endDate) {
      return false; 
    }
  
    return true;
  }
    
  removeChip(removedValue: any) {
    console.log(removedValue);
      this.selectedFilters = this.selectedFilters.filter((value: any) => value !== removedValue);
    console.log(this.selectedFilters);
      for (const key in this.filterForm.value) {
      if (this.filterForm.value.hasOwnProperty(key)) {
        const value = this.filterForm.value[key];
  
        if (Array.isArray(value)) {
          this.filterForm.patchValue({ [key]: value.filter(item => item !== removedValue) });
        } else if (value === removedValue) {
          this.filterForm.patchValue({ [key]: null });
        }
      }
    }
      this.applyFilters();
  
    return this.selectedFilters;
  }
  
  clearFilter() {
    this.filterForm.reset();
  
    this.selectedFilters = [];
       this.dataSource = [...this.user.userdata];
       console.log(this.dataSource);
       
    // if(this.selectedFilters.length>0){
      this.filterChanged.emit(this.dataSource);

    // }
  }
  
  
  
    
  }
  
  
  

