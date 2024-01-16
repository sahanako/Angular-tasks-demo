import { Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatChipInputEvent } from '@angular/material/chips';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent {

  Users: any;
  userForm: any;

  simpleDialog: MatDialogRef<DialogComponent> | undefined;
  message: string = '';
  noUsersMessage?: string;
  usermesage?: boolean;
  gender = new FormControl('');
  domain = new FormControl('');
  project = new FormControl('')
  date = new FormControl('')

  genderList: string[] = ['Male','Female','Other'];
  domainList:string[] = ['Frontend','Backend','Tester']
  projectList:string[] = ['Project1','Project2','Project3','None']
  dateList:string[]=['Last 30 days','Last 60 days','Last 90 days','Custom date']
  datepipe: any;
  startDate: any;
  endDate: any;
  filteredData: any;
  currentPage: number=0;
  pageSize: number=0;
  showNoDataMessage?: boolean;
  selectedchip: any;
  selectedChips: any[]=[];
  selectchip!: boolean ;
  isselected: any;
  constructor(private paginator1: MatPaginatorIntl,private renderer: Renderer2,private userService: UserService, private router: Router, private dialogModel: MatDialog,private fb:FormBuilder) {
    this.dateRangeForm = this.fb.group({
      startDate: null,
      endDate: null,
    });
  }
  dateRangeForm: FormGroup;
  selectedFilters:any[] = [];

  @Output() dateRangeSelected = new EventEmitter<{ startDate: Date; endDate: Date }>();

displayedColumns: string[] = ['name', 'email', 'gender', 'project','dob', 'domain','status'];
statusChips: { value: string, icon: string }[] = [
  { value: 'Pending', icon: 'pending_actions' },
  { value: 'Inprogress', icon: 'pace' },
  { value: 'Completed', icon: 'check_circle' }
];
  dataSource :any[] = [];
  filteredDataSource: any;
  ngOnInit(): void {
    
    this.getAllUsers();  
    this.paginator1.itemsPerPageLabel = 'Data per page';

  }
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('picker') datepicker!: MatDatepicker<any>;

  userEdit(id: any) {
    console.log(id)
    this.userService.editUser(id);
  }

  addUser() {
    this.userService.addUser();
  }

  filterConfigs: { label: string; placeholder: string; options: string[]; isMultiple: boolean }[] = [
    { label: 'Project', placeholder: 'Select project', options: ['project1', 'project2'], isMultiple: false },
    { label: 'Domain', placeholder: 'Select domain', options: ['Frontend', 'Backend'], isMultiple: true },
    { label: 'Gender', placeholder: 'Select gender', options: ['Male', 'Female','Other'], isMultiple: true },
  ];

  // removeFilter(filter: string) {
  //   const index = this.selectedFilters.indexOf(filter);
  //   if (index !== -1) {
  //     this.selectedFilters.splice(index, 1);
  //     this.gender.setValue(this.selectedFilters); // Update the form control
  //   }
  // }

  onFiltersApplied(event: any, filterConfigs: any) {
    const selectedValues: string[] = event.value;
    const isMultiple: boolean = filterConfigs.isMultiple;
    const filterType: string = filterConfigs.label.toLowerCase();
  
    this.filteredData = this.dataSource.filter(item => {
      // Check if there are no selected values for the current filter
      if (!selectedValues || selectedValues.length === 0) {
        return true; // Return true for all items to display all data
      }
  
      switch (filterType) {
        case 'gender':
          const itemGender = item.gender ? item.gender.toLowerCase() : '';
          const selectedGenders = selectedValues.map(value => value.toLowerCase());
          return isMultiple ? selectedGenders.includes(itemGender) : itemGender === selectedGenders[0];
  
        case 'domain':
          const itemDomain = item.domain ? item.domain.toLowerCase() : '';
          const selectedDomains = selectedValues.map(value => value.toLowerCase());
          return isMultiple ? selectedDomains.some(value => itemDomain.includes(value)) : itemDomain.includes(selectedDomains[0]);
  
        case 'project':
          const itemProject = item.project ? item.project.toLowerCase() : '';
          const selectedProjects = selectedValues;
          return selectedProjects.includes(itemProject);
      }
    });
  
    console.log(this.filteredData);
    this.paginator.length = this.filteredData.length;
    this.paginator.pageIndex = 0;
    this.filteredDataSource = new MatTableDataSource<any>(this.filteredData);
    this.filteredDataSource.paginator = this.paginator;
  }
   

  onDateSelectionChange() {
    if (this.date.value === 'Custom date') {
      this.datepicker.open();
    } else {
      this.applyFilters();  // Reapply filters if other date options are selected
    }
  }
  // filterDataByGender() {
  //   const selectedGenders: string[] = Array.isArray(this.gender.value) ? this.gender.value : [];
  //   const lowercaseGenders = selectedGenders.map(gender => gender.toLowerCase());
  
  //   if (lowercaseGenders.length === 0) {
  //     this.filteredData = this.dataSource; 
  //   } else {
  //     this.filteredData = this.dataSource.filter((item: { gender: string; }) => {
  //       return lowercaseGenders.includes(item.gender.toLowerCase());
  //     });
  //   }
  //     this.paginator.length = this.filteredData.length;
  //   this.paginator.pageIndex = 0;
  //     this.filteredDataSource = new MatTableDataSource<any>(this.filteredData);
  //   this.filteredDataSource.paginator = this.paginator;
  // }
  
  // filterDataByDomain() {
  //   const selectedDomains: string[] = Array.isArray(this.domain.value) ? this.domain.value : [];
  //   const lowercaseDomains = selectedDomains.map(domain => domain.toLowerCase());
  
  //   if (lowercaseDomains.length === 0) {
  //     this.filteredData = this.dataSource; 
  //   } else {
  //     this.filteredData = this.dataSource.filter((item: { domain: string; }) => {
  //       return lowercaseDomains.some(selectedDomain => item.domain.toLowerCase().includes(selectedDomain));
  //     });
  //   }
  //     this.paginator.length = this.filteredData.length;
  //   this.paginator.pageIndex = 0;
  //     this.filteredDataSource = new MatTableDataSource<any>(this.filteredData);
  //   this.filteredDataSource.paginator = this.paginator;
  // }
  
  // filterDataByProject() {
  //   const selectedProject: any = this.project.value;
  
  //   if (!selectedProject) {
  //     this.filteredData = this.dataSource; 
  //   } 
  //   else if (selectedProject === 'None'){
  //     this.filteredData = this.dataSource
  //   }
  //   else {
  //     this.filteredData = this.dataSource.filter((item: { project: string; }) => {
  //       return item.project.toLowerCase() === selectedProject.toLowerCase();
  //     });
  //   }
  //   this.paginator.length = this.filteredData.length;
  //     this.paginator.pageIndex = 0;
  //     this.filteredDataSource = new MatTableDataSource<any>(this.filteredData);
  //   this.filteredDataSource.paginator = this.paginator;
  // }
  selectedchips(chipValue: string): void {    
    if (this.selectedChips.includes(chipValue.toLowerCase())) {      
      this.selectedChips = this.selectedChips.filter((selectedChip: string) => selectedChip !== chipValue.toLowerCase());
    } else {
      this.selectedChips.push(chipValue.toLowerCase());
      this.selectchip = !this.selectchip
    }   
    console.log(this.selectedChips);
    this.applyFilters();
  }

  applyFilters() {

    const selectedGenders: string[] = Array.isArray(this.gender.value) ? this.gender.value : [];
    const lowercaseGenders = selectedGenders.map(gender => gender.toLowerCase().trim());
    
    const selectedDomains: string[] = Array.isArray(this.domain.value) ? this.domain.value : [];
    const lowercaseDomains = selectedDomains.map(domain => domain.toLowerCase());
  
    const selectedProject: any = this.project.value;
  
    const selectedProjectValues = selectedProject && selectedProject !== 'None' ? selectedProject.split(',').map((value: string) => value.trim()) : [];

    
    this.selectedFilters = [
      ...lowercaseGenders,
      ...lowercaseDomains,
      ...selectedProjectValues,
    ];
    
    // Date range filter
    const currentDate = new Date();
    let startDate: Date | null ;
    let endDate: Date | null ;
    
    console.log(this.startDate?.toLocaleString(),this.endDate?.toLocaleString());
    
    switch (this.date.value) {
      case 'Last 30 days':
        startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 30);
        break;
      case 'Last 60 days':
        startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 60); 
               
        break;
      case 'Last 90 days':
        startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 90);
        break;
        case 'Custom date':
           startDate = this.startDate;
           endDate = this.endDate;
                  break;
      default:
        // No date range selected
        break;
    }
  
    // Filter data based on selected date range
    this.filteredData = this.dataSource.filter((item: { gender: string, domain: string, project: string, dob: Date, status:string }) => {
      const matchesGender = lowercaseGenders.length === 0 || lowercaseGenders.includes(item.gender.toLowerCase());
      const matchesDomain = lowercaseDomains.length === 0 || lowercaseDomains.some(selectedDomain => item.domain.toLowerCase().includes(selectedDomain));
      const matchesProject = !selectedProject || (selectedProject === 'None') || (item.project && item.project.toLowerCase() === selectedProject.toLowerCase());

      const matchStatus = this.selectedChips.length === 0 || this.selectedChips.includes(item.status);

console.log(this.selectedChips.includes(item.status));
  
      if (item.dob) {
        const itemDate = new Date(item.dob);        
        if (!isNaN(itemDate.getTime())) {          
          const isDateInRange = this.isDateInRange(itemDate, startDate, endDate);
          return matchesGender && matchesDomain && matchesProject && isDateInRange && matchStatus;
        } else {
          console.error('Invalid date:', item.dob);
          return false;
        }
      } else {
        console.error('Null or undefined date:', item.dob);
        return false;
      }
    });
    this.showNoDataMessage = this.filteredData?.length === 0
  
    this.paginator.length = this.filteredData.length;
    this.paginator.pageIndex = 0;
    this.filteredDataSource = new MatTableDataSource<any>(this.filteredData);
    this.filteredDataSource.paginator = this.paginator;
  }
  
  isDateInRange(date: Date, startDate: Date | null, endDate: Date | null): boolean {
    
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
  
  clearAllFilters() {
    (this.gender as FormControl).setValue([]);
    (this.domain as FormControl).setValue([]);
    (this.project as FormControl).setValue(null);
    (this.date as FormControl).setValue([])
    this.applyFilters();
  }
  

  updateSelectedFilters(filterName: string, filterValues: any[]) {
    const existingFilterIndex = this.selectedFilters.findIndex(filter => filter.name === filterName);
  
    if (existingFilterIndex !== -1) {
      this.selectedFilters[existingFilterIndex].value = filterValues;
    } else {
      this.selectedFilters.push({ name: filterName, value: filterValues });
    }
  }

  @ViewChild(MatSort) sort? : MatSort
  getAllUsers() {
    this.userService.getAllUserJson().subscribe(data => {
      console.log('users', data);
      if (data && data.length > 0) {
        this.dataSource = data;
        this.filteredDataSource = data;
      }
      this.showNoDataMessage =data.length === 0;
      
      this.filteredDataSource = new MatTableDataSource<any>(data);
      this.filteredDataSource.paginator = this.paginator

      this.filteredDataSource.sort  =  this.sort
    });
  }

  getUserById(Id: any) {
    this.userService.getUserById(Id).subscribe(data => {
      console.log(data)
      console.log(data.name)
      this.userForm.patchValue({
        Name: data.name,
        Gender: data.gender,
        Email: data.email,
        project: data.project,
        DOB: data.dob,
        Domain: data.domain
      })
    })
  }

  deleteConfirm(Id: any) {
    const simpleDialog = this.dialogModel.open(DialogComponent)

    simpleDialog.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        // User confirmed the deletion by pressing "Yes"
        this.userService.deleteData(Id).subscribe(data => {
          console.log(data);
          console.log("deleted", data.id)
        });
        this.getAllUsers();
      }
    });
  }

exportToCSV(){
  const replacer = (key: any, value: null) => value === null ? '' : value; // specify how you want to handle null values here
  const header = Object.keys(this.filteredData[0]);
  let csv = this.filteredData.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
  csv.unshift(header.join(','));
  let csvArray = csv.join('\r\n');

  var blob = new Blob([csvArray], {type: 'text/csv' })
  saveAs(blob, "myFile.csv");
  console.log("exported as csv");
}

exportToExcel() {
  if (!this.filteredData || this.filteredData.length === 0) {
    console.error('DataSource is empty or not defined');
    return;
  }

  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredData);
  // generate workbook and add the worksheet
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
  // save to file
  XLSX.writeFile(workbook, 'user_data.xlsx');
  console.log('Exported to Excel');
}

emitDateRange() {
  const { startDate, endDate } = this.dateRangeForm?.value;
  this.dateRangeSelected.emit({ startDate, endDate });
}
}


