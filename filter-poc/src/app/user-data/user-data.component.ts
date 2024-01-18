import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { User } from '../common/models/models';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ServiceComponent } from '../services/service.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatChipSet } from '@angular/material/chips';
import { FormatDataPipe } from '../common/models/format';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],

})
export class UserDataComponent {


  displayedColumns: string[] = [
    'name',
    'gender',
    'project',
    'phoneno',
    'email',
    'dob',
    'website',
    'domain',
    'status'
  ];
  dataSource: any;
  filteredDataSource!: any;
  filteredData!: any[];
  defaultOption: string = 'Pending';
  SelectedOption: any;
statusCounts!: any;
  status!: number;
  constructor(private userService: ServiceComponent) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterOptions = [
    { icon: 'pending_actions', value: 'Pending' },
    { icon: 'pending_actions', value: 'Inprogress' },
    { icon: 'check_circle', value: 'Completed' }
  ];
  selectedFilters: string[] = [];

  ngOnInit() {
    this.getAllUsers();
    this.SelectedOption = this.defaultOption;

  }
  @Output() statusCountsChanged = new EventEmitter<{ [status: string]: number }>();

  selectedOptions: string[] = ['Pending'];
  getAllUsers() {
    this.userService.getAllUserJson().subscribe(data => {
      this.userService.userdata = data
      console.log('users', data);
      this.dataSource = data;
      this.filteredDataSource = data;

       this.statusCounts= {};
      data.forEach((user: any) => {
        const lowerCaseStatus = user.status;
         this.status = this.statusCounts[lowerCaseStatus] = (this.statusCounts[lowerCaseStatus] || 0) + 1;
      });

      console.log(this.statusCounts);

      // Emit the statusCountsChanged event
    
      if (this.selectedOptions.length > 0) {
        this.filteredData = this.dataSource?.filter((user: { status: any; }) => {
          const lowerCaseStatus = user.status;
          return this.selectedOptions.includes(lowerCaseStatus);
        });
        this.filteredDataSource = new MatTableDataSource<any>(this.filteredData);
        this.filteredDataSource.paginator = this.paginator
      }
    });
    
  }


  selectedChips: string[] = [];

  onSelectedOption(event: any) {
    if (this.selectedChips.includes(event)) {
      this.selectedChips = this.selectedChips.filter(chip => chip !== event);
    } else {
      this.selectedChips.push(event);
    }
    this.filteredData = this.dataSource?.filter((item: { status: any; }) => {
      return this.selectedChips.includes(item.status);
    });
    if (this.selectedChips.length === 0) {
      this.filteredData = this.dataSource
    }
    this.paginator.length = this.filteredData.length;
    this.paginator.pageIndex = 0;
    this.filteredDataSource = new MatTableDataSource<any>(this.filteredData);
    this.filteredDataSource.paginator = this.paginator;
    console.log(this.filteredData?.length);
  }

  filteredUserData: any[] = [];
  searchQuery: string = '';
  onSearchInputChange(value: string): void {
    this.searchQuery = value;
    this.applySearch();
  }

  applySearch(): void {
    if (this.searchQuery.trim() === '') {
      console.log("jhdkjadkjakds", this.dataSource);
      this.filteredData = this.dataSource;
      this.filteredDataSource = new MatTableDataSource<any>(this.filteredData)
      this.filteredDataSource.paginator = this.paginator;
    } else {
      this.filteredData = this.dataSource.filter((user: { [s: string]: unknown; } | ArrayLike<unknown>) => {
        return Object.values(user).some(value => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(this.searchQuery.toLowerCase());
          }
          return false;
        });
      });
      this.filteredDataSource = new MatTableDataSource<any>(this.filteredData)
      this.filteredDataSource.paginator = this.paginator;

    }
  }

  handleFilteredData(event: any) {
    console.log(event);
    this.filteredDataSource = new MatTableDataSource<any>(event)
    this.filteredDataSource.paginator = this.paginator;
  }




  exportToCSV() {
    console.log(this.filteredDataSource);

    if (!this.filteredDataSource.data || this.filteredDataSource.data.length === 0) {
      console.error('No data to export.');
      return;
    }

    const replacer = (key: any, value: null) => (value === null ? '' : value);
    const header = Object.keys(this.filteredDataSource.data[0]);

    const csv = this.filteredDataSource.data.map((row: { [x: string]: any }) =>
      header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')
    );

    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const blob = new Blob([csvArray], { type: 'text/csv' });
    saveAs(blob, 'myFile.csv');
    console.log('Exported as CSV');
  }


  exportToExcel() {
    if (!this.filteredDataSource.data || this.filteredDataSource.data.length === 0) {
      console.error('DataSource is empty or not defined');
      return;
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredDataSource.data);
    // generate workbook and add the worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    // save to file
    XLSX.writeFile(workbook, 'user_data.xlsx');
    console.log('Exported to Excel');
  }
}

