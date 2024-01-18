import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {
  @Output() searchChange = new EventEmitter<string>();
  searchForm: FormGroup;
  private searchSubject = new Subject<string>();
  search: string = '';
searchInput: any;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchInput: ['', Validators.required],
    });
    this.searchSubject.pipe(debounceTime(2000), distinctUntilChanged()).subscribe(value => {
      this.searchChange.emit(value);
      console.log("hello",value);
    });
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(inputValue);
  }
  clearSearch(){  
      this.searchForm.get('searchInput')?.setValue('');
      this.searchChange.emit('');
  }
}
